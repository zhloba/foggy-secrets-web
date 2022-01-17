import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FileInfo } from '../shared/file-info'
import { FileStatus } from '../shared/file-status'
import { saveAs } from 'file-saver';
import * as prettyBytes from 'pretty-bytes';
//import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'file-item',
    templateUrl: 'file-item.component.html',
    styleUrls: ['file-item.component.css']    
})
export class FileItemComponent {
    fileStatus = FileStatus;
    @Input() item: FileInfo; 
    @Output() delete = new EventEmitter();

    onDelete() {
        this.delete.emit(this.item);
    }

    onSave() {
        saveAs(this.item.file, this.item.name);       
    }

    prettifyBytes(byte: number): string {
        return prettyBytes(byte);
    }

    formatDate(date: number): string {
        return date.toString(); //moment(date).format("l LT");   
    }

}