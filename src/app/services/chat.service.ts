import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MessageInt } from '../Interfaces/message.interface';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  
  
  private itemsCollection!: AngularFirestoreCollection<MessageInt>;

  public chats: MessageInt[] = []

  constructor(private afs: AngularFirestore) { }

  loadMessages() {

    this.itemsCollection = this.afs.collection<MessageInt>('chats')

    return this.itemsCollection.valueChanges().pipe(map((message: MessageInt[]) => {
      console.log(message)
      this.chats = message
    }))

  }

  addMessage(text: string) {
    let msg: MessageInt = {
      name: 'Lewis',
      message: text,
      date: new Date().getTime()
    }

    return this.itemsCollection.add(msg)
  }


}
