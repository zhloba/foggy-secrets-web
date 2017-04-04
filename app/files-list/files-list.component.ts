import { Component } from '@angular/core'
import { FileInfo } from '../shared/file-info'
import { files } from '../shared/data'

@Component({
    moduleId: module.id,
    selector: 'files-list',
    templateUrl: 'files-list.component.html',
    styleUrls: ['files-list.component.css']
})
export class FilesListComponent {
    files: FileInfo[] = files;
}