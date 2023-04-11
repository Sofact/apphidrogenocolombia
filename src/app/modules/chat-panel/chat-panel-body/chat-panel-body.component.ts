import { Component} from '@angular/core';
import { ProfileUserService } from '../services/profile-user.service';
import { ChatPanelService } from '../_services/chat-panel.service';
import { Message } from 'primeng/api';
import { ECHO_PUSHER } from 'src/app/config/config';
import { AuthService } from '../../auth/_services/auth.service';
import { CrearChatGrupalService } from '../services/crear-chat-grupal.service';


@Component({
  selector: 'app-chat-panel-body',
  templateUrl: './chat-panel-body.component.html'
})
export class ChatPanelBodyComponent {

  user:any;
  lado: string= '';
  mensaje: string;
  users_contacts:any =[];
  groups: any[];
  path: string = '/assets/media/avatar/';
  to_user: any;
  loadChatPanelContent: boolean = true;
  chat_chat_rooms:any =[];
  step: string='';
  contador: number =0;
  nombreChatGrupal:string = '';


  sendMessageTexto(){
    console.log("El to_user::::",this.to_user);

    let data= {
      
      chat_room_id: this.to_user.room_id,
      message:this.mensaje,
      to_user_id : this.to_user.user.id


    }
    console.log(this.mensaje);
    this.mensaje = null;
     this._chatPanelService.sendMessageTxt(data).subscribe((resp:any) => {
      console.log(resp);
    })
   /* .subscribe((resp) =>{
      console.log(resp);
    })*/
  }

  constructor(
              private _userProfileService: ProfileUserService,
              private _chatPanelService: ChatPanelService,
              private _crearChatGrupalService: CrearChatGrupalService
              ) { }
  ngOnInit(): void {
   // $("#messageInput").emojioneArea();
    this.ContactsUsers();
    this.GetGroups();
    this.user = this._chatPanelService.authService.user;

    this.listMyFriends();

    const ECHO_PUSHER_INST = ECHO_PUSHER(this._chatPanelService.authService.token);
    ECHO_PUSHER_INST.private("chat.refresh.room."+this._userProfileService.authService.user.id)
      .listen('RefreshMyChatRoom', (e:any) => {
        console.log(e);
        this.chat_chat_rooms = [];
        this.chat_chat_rooms = e.chatrooms;

      });
  }


    ContactsUsers(){
    
      this._userProfileService.ContactUsers().subscribe((resp: any) => {
        console.log(resp);
                this.users_contacts = resp.users;
      })
    }

    GetGroups(){
    
      this._chatPanelService.listMyGroups()
        .subscribe((response: any) =>{
          console.log(response);
          this.groups = response.grupo;
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

    listMyFriends(){
      
      this._chatPanelService.listMyChatRooms({}).subscribe((resp: any)=>{
      
        console.log("larespuesta::",resp);
        this.chat_chat_rooms = resp.chatrooms;
      }
        
      )
    }

    loadMyChat(item: any){
      let to_user = 0;
      item.count_message =0;
      if(item.friend_first){
          to_user = item.friend_first.id;
        }else if(item.friend_second){
          to_user = item.friend_second.id;
        }else{
          to_user = item.group_chat.id;
        }
        item.is_chat_Active = true;

      this.startChat(to_user);
    }

    createGroup(){

     
      console.log("grupo creado", this.nombreChatGrupal, "::desoues del nombre");
      this.contador++;
      if(this.contador == 1){
        console.log("el item en cero", this.contador);
        let data = {
          nombreGrupo: this.nombreChatGrupal,
        }
  
        this._crearChatGrupalService.CreateGroupChat(data)
          .subscribe((resp:any) => {
            console.log("larespuesta::",resp);
          })
      }

      if(this.contador == 2){
        console.log("Ahora si se crea");
      //  this.contador=0;
      }
    }
}
