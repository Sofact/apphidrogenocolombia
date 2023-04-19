import { Component, Input, OnInit } from '@angular/core';
import { ECHO_PUSHER, URL_FILESERVER } from 'src/app/config/config';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { ChatPanelService } from '../../../_services/chat-panel.service';

declare var $:any;
@Component({
  selector: 'app-chat-content-panel',
  templateUrl: './chat-content-panel.component.html',
  styleUrls: ['./chat-content-panel.component.css']

})
export class ChatContentPanelComponent implements OnInit{
 
  @Input() to_user:any = null;
  user: any;
  group: any; 
  page:number = 1;
  last_page:number = 1;
  LIST_MESSAGES: any = [];
  path: string =  URL_FILESERVER + '/storage/';

  constructor(  private _chatPanelService: ChatPanelService,
                    public authService: AuthService

    ){}


  ngOnInit(): void {
    this.user = this.authService.user;

    console.log("El id del usuario",this.user);
    this.to_user.messages.forEach((element: any) =>{
      this.LIST_MESSAGES.unshift(element);
    });0

    this.last_page = this.to_user.last_page;

    /*setTimeout(() => {
      $("#ScrollChat").scrollTop( $("#ScrollChat").height());
    }, 50);*/
    this.actualizarScroll();

    console.log("EL uniqd:::",this.to_user.room_uniqd );

    const ECHO_PUSHER_INST = ECHO_PUSHER(this._chatPanelService.authServices.token);
    ECHO_PUSHER_INST.channel("chat.room."+this.to_user.room_uniqd)
      .listen('SendMessageChat', (e:any) => {
        console.log(e);
        this.LIST_MESSAGES.push(e);
        console.log('mensaje');
        this.actualizarScroll();
      });

     
      this.group = this._chatPanelService.listMyGroups()
      .subscribe((response: any) =>{
        console.log("Mis grupos:::",response);
      })

      $("#ScrollChat").scroll(()=>{
        var position = $("#ScrollChat").scrollTop();
         console.log(position);
        if(this.last_page > this.page && position == 0){
          this.page ++;
          //haces una peticion al servidor para que te devuelva los chats anteriores
          this.paginateScroll(this.page,{chat_room_id: this.to_user.room_id});
        }
      })
    this.actualizarScroll();
  }

  paginateScroll(page:any,data:any) {
    this._chatPanelService.paginateScroll(page,data).subscribe((resp:any)=>{
      console.log(resp);
      let last_message = this.LIST_MESSAGES[0];
      var etiqueta = $("#tag"+last_message.id).last();
     // $("#ScrollChat").scrollTop(  $("#ScrollChat").height());
     this.actualizarScroll();
      resp.messages.forEach((element:any) => {
        this.LIST_MESSAGES.unshift(element);
      });
    })
  }

  actualizarScroll()
  {
     // Obtener una referencia al elemento con el ID "mi-elemento"
     const elemento = document.getElementById('chat-finished');
     console.log("El scroll",elemento);
      // Comprobar que el elemento existe antes de llamar al método
      if (elemento !== null) {
        elemento.scrollIntoView();
      } else {
        console.error('El elemento no existerr');
      }
  }

}
