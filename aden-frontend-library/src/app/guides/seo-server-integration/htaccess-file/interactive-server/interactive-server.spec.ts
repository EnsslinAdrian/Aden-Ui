import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveServer } from './interactive-server';

describe('InteractiveServer', () => {
  let component: InteractiveServer;
  let fixture: ComponentFixture<InteractiveServer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractiveServer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractiveServer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
