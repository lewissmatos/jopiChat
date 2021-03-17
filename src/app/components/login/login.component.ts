import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public cS: ChatService) { }

  ngOnInit(): void {

  }
  logIn(provider: string) {

    this.cS.login(provider)
    
    console.log(provider)
  }



}
