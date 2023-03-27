import { Component, OnInit } from '@angular/core';
import { ProfileUserService } from '../services/profile-user.service';

@Component({
  selector: 'app-chat-panel-body',
  templateUrl: './chat-panel-body.component.html',
  styleUrls: ['./chat-panel-body.component.scss']
})
export class ChatPanelBodyComponent implements OnInit {

  users_contacts:any =[];

  constructor(
              private _userProfileService: ProfileUserService
              ) { }
  ngOnInit(): void {
    this.ContactUsers();
  }


    ContactUsers(){
    
      this._userProfileService.ContactUsers().subscribe((resp: any) => {
        console.log(resp);
                this.users_contacts = resp.users;
      })
    }
}
