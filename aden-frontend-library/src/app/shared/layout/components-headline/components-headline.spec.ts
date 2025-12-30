import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsHeadline } from './components-headline';

describe('ComponentsHeadline', () => {
  let component: ComponentsHeadline;
  let fixture: ComponentFixture<ComponentsHeadline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsHeadline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentsHeadline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
