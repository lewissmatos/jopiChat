import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MessageInt } from '../Interfaces/message.interface';
import { map } from 'rxjs/operators'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private itemsCollection!: AngularFirestoreCollection<MessageInt>;

  public chats: MessageInt[] = []
  public user: any = {}

  
  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(userParam => {

      console.log('estado del usuario: ', userParam)
      
      if (!userParam) {
        return
      }
      
      this.user.name = userParam.displayName
      this.user.uid = userParam.uid

    }) 

   }


  login(provider: string) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  }


  logout() {
    this.user = {}
    this.afAuth.auth.signOut();
  }

  loadMessages() {

    this.itemsCollection = this.afs.collection<MessageInt>('chats', ref => ref.orderBy('date', 'desc').limit(10))

    return this.itemsCollection.valueChanges().pipe(map((message: MessageInt[]) => {
      console.log(message)
      this.chats = []

      for (let msg of message) {
        this.chats.unshift(msg)
      }

      return this.chats

    }))

  }

  addMessage(text: string) {
    let msg: MessageInt = {
      name: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid,
    }

    return this.itemsCollection.add(msg)
  }


}
