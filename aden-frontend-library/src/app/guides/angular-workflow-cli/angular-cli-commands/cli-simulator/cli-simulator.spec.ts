import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliSimulator } from './cli-simulator';

describe('CliSimulator', () => {
  let component: CliSimulator;
  let fixture: ComponentFixture<CliSimulator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CliSimulator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CliSimulator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
