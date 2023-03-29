import { Component, Input, OnInit } from '@angular/core';
import { ChatPanelService } from '../../../_services/chat-panel.service';

@Component({
  selector: 'app-chat-content-panel',
  templateUrl: './chat-content-panel.component.html'
})
export class ChatContentPanelComponent implements OnInit{
 
  @Input() to_user:any = null;
  user: any;

  constructor(  private _chatPanelService: ChatPanelService
    ){}


  ngOnInit(): void {
   // this.user = this._chatPanelService.authService.user;
    console.log(this.to_user);

  }




}
