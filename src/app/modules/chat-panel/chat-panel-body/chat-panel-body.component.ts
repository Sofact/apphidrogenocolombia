import { Component} from '@angular/core';
import { ProfileUserService } from '../services/profile-user.service';
import { ChatPanelService } from '../_services/chat-panel.service';
import { Message } from 'primeng/api';
import { ECHO_PUSHER, URL_BACKEND } from 'src/app/config/config';
import { AuthService } from '../../auth/_services/auth.service';
import { CrearChatGrupalService } from '../services/crear-chat-grupal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-chat-panel-body',
  templateUrl: './chat-panel-body.component.html'
})
export class ChatPanelBodyComponent {

  user:any;
  lado: string= '';
  mensaje: string;
  users_contacts:any =[];
  group_contacts: any =[];
  group_id: string ='';
  groups: any[];
  path: string = URL_BACKEND + '/storage/';
  to_user: any;
  loadChatPanelContent: boolean = true;
  chat_chat_rooms:any =[];
  step: string='';
  contador: number =0;
  users_actives:any = [];
  message_text_area:any = null;
  nombreChatGrupal:string = '';


  constructor(
              private _userProfileService: ProfileUserService,
              private _chatPanelService: ChatPanelService,
              private _crearChatGrupalService: CrearChatGrupalService,
              private route: Router,
              private router: ActivatedRoute,
              private location: Location
              ) { }
  ngOnInit(): void {

    this.router.paramMap.subscribe(params => {
      this.group_id = params.get('id');
    });

    if(this.group_id){
      this.startChatGroup(Number(this.group_id));
    }
   // $("#messageInput").emojioneArea();
    this.ContactsUsers();
    this.GetGroups();
    this.user = this._chatPanelService.authServices.user;


    this.listMyFriends();

    const ECHO_PUSHER_INST = ECHO_PUSHER(this._chatPanelService.authServices.token);
    ECHO_PUSHER_INST.private("chat.refresh.room."+this._userProfileService.authService.user.id)
      .listen('RefreshMyChatRoom', (e:any) => {
        console.log("Mensaje en RefreshChatRoom:::::",e);
        this.chat_chat_rooms = [];
        this.chat_chat_rooms = e.chatrooms;
        this.listMyFriends();
       // this.asignedUserActive();
      });
  }
  
  irAPaginaDestino() {
    window.location.reload();
  }
  
  irAPaginaDash() {
    this.route.navigate(['dash']);
  }

  sendMessageText(){
    console.log("EL to_user::",this.to_user);

    let data= {
      

      chat_room_id: this.to_user.room_id,
      message:this.mensaje,
      to_user_id : this.to_user.user.id


    }
    if(this.mensaje){
    console.log(this.mensaje);
    this.mensaje = null;
     this._chatPanelService.sendMessageTxt(data).subscribe((resp:any) => {
      console.log(resp);
     
    })
  }
   /* .subscribe((resp) =>{
      console.log(resp);
    })*/
  }

  /*
  asignedUserActive(){
    for (const user of this.users_actives) {
      const Index = this.chat_chat_rooms.findIndex((item:any) => {
        if(item.friend_first){
          return item.friend_first.id == user.id;
        }else if (item.friend_second){
          return item.friend_second.id == user.id;
        }
        return;
      });

      if(Index != -1){
        this.chat_chat_rooms[Index].is_active = true;
      }

      const IndexN = this.users_contacts.findIndex((item:any) => item.id == user.id);
      if(IndexN != -1){
        this.users_contacts[IndexN].is_active = true;
      }

      if(this.to_user && this.to_user.user.id == user.id){
        this.to_user.is_active = true;
      }
    }
  }*/

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
      
        console.log(resp);
        this.loadChatPanelContent = true;
        /*
        setTimeout(() =>{
          $("#messageInput").emojioneArea();
        },50);*/
        $("#startConversation").modal("hide");
        this.to_user = resp;
      })
    }

    startChatGroup(value: number){

      let data = {
        to_user_id: value,
      }

      this.loadChatPanelContent = false;
      this._chatPanelService.startChatGroup(data).subscribe((resp:any) => {
      
        console.log(resp);
        this.loadChatPanelContent = true;

        $("#participarGrupo").modal("hide");
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
      let to_user_id = 0;
      item.count_message =0;
      if(item.friend_first){
        to_user_id = item.friend_first.id;
        }else if(item.friend_second){
          to_user_id = item.friend_second.id;
        }else{
          to_user_id = item.group_chat.id;
        }
        item.is_chat_Active = true;
        this.chat_chat_rooms.map((element:any)=>{
          if(element.uniqd != item.uniqd){
            element.is_chat_active = false;
          }
          return element;
        })
      this.startChat(to_user_id);
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
      this.listMyFriends();
      }
    }

    hideModal(){
      $("#startConversation").modal("hide");
     
      this.GetGroups();
    }
}
