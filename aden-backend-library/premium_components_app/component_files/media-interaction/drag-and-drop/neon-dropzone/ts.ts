import { Component } from '@angular/core';

@Component({
    selector: 'example-component',
    imports: [],
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
    files: FileItem[] = [];

    /**
     * Handles the drag enter event and sets the dragging state to true.
     * @param event - The drag event
     */
    onDragEnter(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = true;
    }

    /**
     * Handles drag over event and sets dragging state.
     * @param event - The drag event
     */
    onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();

        if (!this.isDragging) {
            this.isDragging = true;
        }
    }

    /**
     * Handles drag leave events and updates dragging state.
     * @param event - The drag event
     */
    onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();

        if ((event.currentTarget as HTMLElement).contains(event.relatedTarget as Node)) {
            return;
        }

        this.isDragging = false;
    }

    /**
     * Handles file drop events and processes the dropped files.
     * @param event - The drag event containing the dropped files
     */
    onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;

        const droppedFiles = event.dataTransfer?.files;
        if (droppedFiles) {
            this.handleFiles(droppedFiles);
        }
    }

    /**
     * Handles file selection from input element and processes selected files.
     * @param event - The file input change event
     */
    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            this.handleFiles(input.files);
        }
    }

    /**
     * Verarbeitet hochgeladene Dateien und fügt sie der Dateiliste hinzu.
     * @param fileList - Die Liste der zu verarbeitenden Dateien
     */
    handleFiles(fileList: FileList) {
        Array.from(fileList).forEach(file => {
            this.files.push({
                name: file.name,
                size: this.formatBytes(file.size),
                type: file.type
            });
        });
    }

    /**
     * Removes a file from the files array at the specified index.
     * @param index - The index of the file to remove
     * @param event - The event to stop propagation on
     */
    removeFile(index: number, event: Event) {
        event.stopPropagation();
        this.files.splice(index, 1);
    }

    /**
     * Converts bytes to a human-readable format.
     * @param bytes - The number of bytes to format
     * @param decimals - Number of decimal places (default: 2)
     * @returns Formatted string with appropriate unit (Bytes, KB, MB, GB)
     */
    formatBytes(bytes: number, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}
