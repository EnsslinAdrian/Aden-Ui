import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAreaGrid } from './custom-area-grid';

describe('CustomAreaGrid', () => {
  let component: CustomAreaGrid;
  let fixture: ComponentFixture<CustomAreaGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomAreaGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomAreaGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
