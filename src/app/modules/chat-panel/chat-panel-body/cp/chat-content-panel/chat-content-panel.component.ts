import { Component, Input, OnInit } from '@angular/core';
import { ECHO_PUSHER } from 'src/app/config/config';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
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

  constructor(  private _chatPanelService: ChatPanelService,
                    public authService: AuthService

    ){}


  ngOnInit(): void {
    this.user = this._chatPanelService.authService.user;
    console.log("El id del usuario",this.user);
    this.to_user.messages.forEach((element: any) =>{
      this.LIST_MESSAGES.unshift(element);
    });0

    console.log("el token antes de authenticar el boadcast::::",this.authService.token);
    const ECHO_PUSHER_INST = ECHO_PUSHER(this.authService.token);
    ECHO_PUSHER_INST.channel("chat.room."+this.to_user.room_uniqd)
      .listen('SendMessageChat', (e:any) => {
        console.log("respuseta del echo_pusher::::",e);
        this.LIST_MESSAGES.push(e);
      });
  }




}
