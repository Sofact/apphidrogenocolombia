import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPanelBodyComponent } from './chat-panel-body.component';

describe('ChatPanelBodyComponent', () => {
  let component: ChatPanelBodyComponent;
  let fixture: ComponentFixture<ChatPanelBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPanelBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatPanelBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
