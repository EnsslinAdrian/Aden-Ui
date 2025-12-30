import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpCommunication } from './http-communication';

describe('HttpCommunication', () => {
  let component: HttpCommunication;
  let fixture: ComponentFixture<HttpCommunication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpCommunication]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpCommunication);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
