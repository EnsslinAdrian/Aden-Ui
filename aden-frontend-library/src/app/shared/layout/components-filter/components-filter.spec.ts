import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsFilter } from './components-filter';

describe('ComponentsFilter', () => {
  let component: ComponentsFilter;
  let fixture: ComponentFixture<ComponentsFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentsFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
