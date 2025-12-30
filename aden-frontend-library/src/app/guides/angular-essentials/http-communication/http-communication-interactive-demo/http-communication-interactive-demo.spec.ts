import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpCommunicationInteractiveDemo } from './http-communication-interactive-demo';

describe('HttpCommunicationInteractiveDemo', () => {
  let component: HttpCommunicationInteractiveDemo;
  let fixture: ComponentFixture<HttpCommunicationInteractiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpCommunicationInteractiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpCommunicationInteractiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
