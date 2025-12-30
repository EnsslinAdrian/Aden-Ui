import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryComponents } from './library-components';

describe('LibraryComponents', () => {
  let component: LibraryComponents;
  let fixture: ComponentFixture<LibraryComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
