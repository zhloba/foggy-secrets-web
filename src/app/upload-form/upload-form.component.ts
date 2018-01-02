import { Component } from '@angular/core'
import { FileService } from '../shared/file.service'

@Component({
    moduleId: module.id,
    selector: 'upload-form',
    templateUrl: 'upload-form.component.html',
    styleUrls: ['upload-form.component.css']
})
export class UploadFormComponent {
    password: string = '';
    constructor(private fileService: FileService) {

    }

    onAdd(files: File[]) {
        this.fileService.addFile(files, this.password);
    }
}