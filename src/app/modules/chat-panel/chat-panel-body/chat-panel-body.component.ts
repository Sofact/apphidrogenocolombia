import { Component} from '@angular/core';
import { ProfileUserService } from '../services/profile-user.service';
import { ChatPanelService } from '../_services/chat-panel.service';
import { Message } from 'primeng/api';
import { ECHO_PUSHER } from '../../../config/config';


@Component({
  selector: 'app-chat-panel-body',
  templateUrl: './chat-panel-body.component.html'
})
export class ChatPanelBodyComponent {

  user:any;
  lado: string= '';
  mensaje: string;
  users_contacts:any =[];
  path: string = '/assets/media/avatar/';
  to_user: any;
  loadChatPanelContent: boolean = true;

  sendMessageTexto(){

    let data= {
      
      chat_room_id: this.to_user.room_id,
      message:this.mensaje,
      to_user_id : this.to_user.user.id


    }
    console.log(this.mensaje);
     this._chatPanelService.sendMessageTxt(data).subscribe((resp:any) => {
      console.log(resp);
    })
   /* .subscribe((resp) =>{
      console.log(resp);
    })*/
  }

  constructor(
              private _userProfileService: ProfileUserService,
              private _chatPanelService: ChatPanelService
              ) { }
  ngOnInit(): void {
   // $("#messageInput").emojioneArea();
    this.ContactsUsers();
    this.user = this._chatPanelService.authService.user;

    
  }


    ContactsUsers(){
    
      this._userProfileService.ContactUsers().subscribe((resp: any) => {
        console.log(resp);
                this.users_contacts = resp.users;
      })
    }

    startChat(value: number){

      let data = {
        to_user_id: value,
      }

      this.loadChatPanelContent = false;
      this._chatPanelService.startChat(data).subscribe((resp:any) => {
      
        console.log("larespuesta::",resp);
        this.loadChatPanelContent = true;
        /*
        setTimeout(() =>{
          $("#messageInput").emojioneArea();
        },50);*/
        $("#startConversation").modal("hide");
        this.to_user = resp;
      })
    }


}
