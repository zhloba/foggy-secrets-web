import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FileInfo } from '../shared/file-info'
import { FileStatus } from '../shared/file-status'

@Component({
    moduleId: module.id,
    selector: 'file-item',
    templateUrl: 'file-item.component.html',
    styleUrls: ['file-item.component.css']    
})
export class FileItemComponent {
    fileStatus = FileStatus;
    @Input() item: FileInfo; // = new FileInfo('test', FileStatus.Decrypted, 6543, new Date(), 70);
    @Output() delete = new EventEmitter();

    onDelete() {
        this.delete.emit(this.item);
    }
}