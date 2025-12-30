import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinkingInComponents } from './thinking-in-components';

describe('ThinkingInComponents', () => {
  let component: ThinkingInComponents;
  let fixture: ComponentFixture<ThinkingInComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThinkingInComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThinkingInComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
