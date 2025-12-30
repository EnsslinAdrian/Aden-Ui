import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanDragDrop } from './kanban-drag-drop';

describe('KanbanDragDrop', () => {
  let component: KanbanDragDrop;
  let fixture: ComponentFixture<KanbanDragDrop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanDragDrop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanDragDrop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
