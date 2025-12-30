import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderStructure } from './folder-structure';

describe('FolderStructure', () => {
  let component: FolderStructure;
  let fixture: ComponentFixture<FolderStructure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderStructure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolderStructure);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
