import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatPanelRoutingModule } from './chat-panel-routing.module';
import { ButtonModule } from 'primeng/button';
import { ChatPanelComponent } from './chat-panel.component';
import { ChatPanelBodyComponent } from './chat-panel-body/chat-panel-body.component';
import { ChatContentPanelComponent } from './chat-panel-body/cp/chat-content-panel/chat-content-panel.component';


@NgModule({
  declarations: [
    //ChatPanelComponent,
    //ChatPanelBodyComponent,
    //ChatContentPanelComponent
  ],
  imports: [
    CommonModule,
    ChatPanelRoutingModule,
    ButtonModule
  ]
})
export class ChatPanelModule { }
