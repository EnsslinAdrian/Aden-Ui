import { Component } from '@angular/core';
import { NeonDropzone } from "./components/neon-dropzone/neon-dropzone";
import { KanbanDragDrop } from "./components/kanban-drag-drop/kanban-drag-drop";

@Component({
  selector: 'app-drag-and-drop',
  imports: [NeonDropzone, KanbanDragDrop],
  templateUrl: './drag-and-drop.html',
  styleUrl: './drag-and-drop.scss',
})
export class DragAndDrop {

}
