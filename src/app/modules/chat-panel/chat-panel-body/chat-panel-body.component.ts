import { Component, OnInit } from '@angular/core';
import { ProfileUserService } from '../services/profile-user.service';
import { ChatPanelService } from '../_services/chat-panel.service';


@Component({
  selector: 'app-chat-panel-body',
  templateUrl: './chat-panel-body.component.html'
})
export class ChatPanelBodyComponent implements OnInit {

  lado: string= '';
  message_text_area: string= 'miguel';
  users_contacts:any =[];
  path: string = '/assets/media/avatar/';
  to_user: any;
  loadChatPanelContent: boolean = true;



  constructor(
              private _userProfileService: ProfileUserService,
              private _chatPanelService: ChatPanelService
              ) { }
  ngOnInit(): void {
   // $("#messageInput").emojioneArea();
    this.ContactsUsers();

    
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
        $("#startConversation").modal("hide");
        this.to_user = resp;
      })
    }

    sendMessageTexto(){

      let test=0;
      console.log(this.message_text_area);
       //this._chatPanelService.sendMessageTxt(data)
     /* .subscribe((resp) =>{
        console.log(resp);
      })*/
    }
}
