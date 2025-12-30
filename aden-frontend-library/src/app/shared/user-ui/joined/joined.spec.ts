import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Joined } from './joined';

describe('Joined', () => {
  let component: Joined;
  let fixture: ComponentFixture<Joined>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Joined]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Joined);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
