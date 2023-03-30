import { Component, Input, OnInit } from '@angular/core';
import { ECHO_PUSHER } from 'src/app/config/config';
import { ChatPanelService } from '../../../_services/chat-panel.service';

@Component({
  selector: 'app-chat-content-panel',
  templateUrl: './chat-content-panel.component.html'
})
export class ChatContentPanelComponent implements OnInit{
 
  @Input() to_user:any = null;
  user: any;
  LIST_MESSAGES: any = [];
  path: string = '/assets/media/avatar/';

  constructor(  private _chatPanelService: ChatPanelService
    ){}


  ngOnInit(): void {
    this.user = this._chatPanelService.authService.user;
    console.log("El id del usuario",this.user);
    this.to_user.messages.forEach((element: any) =>{
      this.LIST_MESSAGES.unshift(element);
    }
    
    )

    const ECHO_PUSHER_INST = ECHO_PUSHER(this._chatPanelService.authService.token);
    ECHO_PUSHER_INST.private("chat.room."+this.to_user.room_uniqd)
      .listen('SendMessageChat', (e:any) => {
        console.log(e);
      });
  }




}
