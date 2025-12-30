import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAttributeDirective } from './custom-attribute-directive';

describe('CustomAttributeDirective', () => {
  let component: CustomAttributeDirective;
  let fixture: ComponentFixture<CustomAttributeDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomAttributeDirective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomAttributeDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
