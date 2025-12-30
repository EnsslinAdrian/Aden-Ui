import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCliCommands } from './angular-cli-commands';

describe('AngularCliCommands', () => {
  let component: AngularCliCommands;
  let fixture: ComponentFixture<AngularCliCommands>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularCliCommands]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularCliCommands);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
