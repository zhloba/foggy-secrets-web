import { Component } from '@angular/core'
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
    fileInfo: FileInfo = new FileInfo('test', FileStatus.Encrypted, 6543, new Date(), 70);
}