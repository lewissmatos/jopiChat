import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  message: string = ''

  
  enviarMensaje() {

    if (this.message.length == 0) {
      return
    }else{
      this.cS.addMessage(this.message)
        .then(() => this.message = '')
        .catch((err) => console.log('error de incersion', err))
    }
  }

  constructor(public cS: ChatService) {
    
    this.cS.loadMessages()
      .subscribe()

  }

  ngOnInit(): void {
  }

}
