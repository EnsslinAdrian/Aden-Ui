import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsHome } from './components-home';

describe('ComponentsHome', () => {
  let component: ComponentsHome;
  let fixture: ComponentFixture<ComponentsHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentsHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
