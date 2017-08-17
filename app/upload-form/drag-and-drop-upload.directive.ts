import { Directive, HostListener, EventEmitter, Output } from '@angular/core';


@Directive({
    selector: '[dnd-upload]'
})
export class DragAndDropUploadDirective {
    @Output() private filesAddEmiter: EventEmitter<File[]> = new EventEmitter();    

    constructor() { }

    @HostListener('dragover', ['$event']) public onDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();        
        evt.dataTransfer.dropEffect = 'copy';      
    }

    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
        evt.stopPropagation();
        evt.preventDefault();                
    }

    @HostListener('drop', ['$event']) public onDrop(evt) {
        evt.stopPropagation();
        evt.preventDefault();                

        this.filesAddEmiter.emit(evt.dataTransfer.files);
    }
}