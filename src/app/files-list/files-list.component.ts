import { Component, OnInit } from '@angular/core'
import { FileInfo } from '../shared/file-info'

import { FileService } from '../shared/file.service'

@Component({
    moduleId: module.id,
    selector: 'files-list',
    templateUrl: 'files-list.component.html',
    styleUrls: ['files-list.component.css']
})
export class FilesListComponent implements OnInit {
    files: FileInfo[];

    constructor(private fileService: FileService) {
        this.files = [];
    }

    ngOnInit() {
        this.files = this.fileService.getFiles();
    }

    delete(file: FileInfo) {        
        this.fileService.deleteFile(file);
    }
}