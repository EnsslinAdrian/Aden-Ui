import { Component } from '@angular/core';
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";

interface Task {
  id: number;
  title: string;
  tag: string;
}

@Component({
  selector: 'app-kanban-drag-drop',
  imports: [UiPlayground],
  templateUrl: './kanban-drag-drop.html',
  styleUrl: './kanban-drag-drop.scss',
})
export class KanbanDragDrop extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Kanban Drag & Drop',
    description: 'A native HTML5 list-to-list drag and drop interface with visual feedback and state management.',
    slug: 'kanban-drag-drop',
  };

  get FILE_CATEGORY() { return 'media-interaction'; }
  get FILE_COMPONENT() { return 'drag-and-drop'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts'];
  }


  todoList: Task[] = [
    { id: 1, title: 'Design System Update', tag: 'Design' },
    { id: 2, title: 'Fix Navigation Bug', tag: 'Bug' },
    { id: 3, title: 'Write Documentation', tag: 'Docs' }
  ];

  doneList: Task[] = [
    { id: 4, title: 'Project Setup', tag: 'Dev' }
  ];

  draggedItem: Task | null = null;
  sourceList: 'todo' | 'done' | null = null;

  isOverTodo = false;
  isOverDone = false;

  /**
   * Handles the drag start event for a task item.
   * @param event - The drag event
   * @param item - The task being dragged
   * @param source - The source list ('todo' or 'done')
   */
  onDragStart(event: DragEvent, item: Task, source: 'todo' | 'done') {
    this.draggedItem = item;
    this.sourceList = source;

    event.dataTransfer?.setData('text/plain', JSON.stringify(item));
    event.dataTransfer!.effectAllowed = 'move';

    const target = event.target as HTMLElement;
    setTimeout(() => target.classList.add('dragging'), 0);
  }

  /**
   * Handles the drag end event and resets drag state.
   * @param event - The drag event
   */
  onDragEnd(event: DragEvent) {
    const target = event.target as HTMLElement;
    target.classList.remove('dragging');

    this.isOverTodo = false;
    this.isOverDone = false;
    this.draggedItem = null;
    this.sourceList = null;
  }

  /**
   * Handles drag over event and updates hover state for target list.
   * @param event - The drag event
   * @param targetList - Target list identifier ('todo' or 'done')
   */
  onDragOver(event: DragEvent, targetList: 'todo' | 'done') {
    event.preventDefault();

    if (targetList === 'todo') this.isOverTodo = true;
    else this.isOverDone = true;
  }

  /**
   * Handles the drag leave event and updates the hover state for the target list.
   * @param event - The drag event
   * @param targetList - The target list identifier ('todo' or 'done')
   */
  onDragLeave(event: DragEvent, targetList: 'todo' | 'done') {
    if (targetList === 'todo') this.isOverTodo = false;
    else this.isOverDone = false;
  }

  /**
   * Handles drop event for drag and drop between todo and done lists.
   * @param event - The drag event
   * @param targetList - The target list ('todo' or 'done')
   */
  onDrop(event: DragEvent, targetList: 'todo' | 'done') {
    event.preventDefault();
    this.isOverTodo = false;
    this.isOverDone = false;

    if (!this.draggedItem || !this.sourceList) return;
    if (this.sourceList === targetList) return;

    if (this.sourceList === 'todo') {
      this.todoList = this.todoList.filter(i => i.id !== this.draggedItem!.id);
    } else {
      this.doneList = this.doneList.filter(i => i.id !== this.draggedItem!.id);
    }

    if (targetList === 'todo') {
      this.todoList.push(this.draggedItem);
    } else {
      this.doneList.push(this.draggedItem);
    }

  }

}
