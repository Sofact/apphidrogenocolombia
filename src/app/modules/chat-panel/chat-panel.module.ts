import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatPanelRoutingModule } from './chat-panel-routing.module';
import { ChatPanelComponent } from './chat-panel.component';
import { ChatPanelBodyComponent } from './chat-panel-body/chat-panel-body.component';


@NgModule({
  declarations: [
    ChatPanelComponent,
    ChatPanelBodyComponent
  ],
  imports: [
    CommonModule,
    ChatPanelRoutingModule
  ]
})
export class ChatPanelModule { }
