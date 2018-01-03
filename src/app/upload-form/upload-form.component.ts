import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FileService } from '../shared/file.service'

@Component({
    moduleId: module.id,
    selector: 'upload-form',
    templateUrl: 'upload-form.component.html',
    styleUrls: ['upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
    form: FormGroup;
    constructor(private fileService: FileService, private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            password: [null, Validators.required]
        });
    }

    isFieldValid(field: string) {
        return !this.form.get(field).valid && this.form.get(field).touched;
    }

    displayFieldCss(field: string) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        };
    }

    validateAllFormFields(formGroup: FormGroup) {         
        Object.keys(formGroup.controls).forEach(field => {  
            const control = formGroup.get(field);             
            if (control instanceof FormControl) {             
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {        
                this.validateAllFormFields(control);            
            }
        });
    }

    onAdd(files: File[]) {
        if (this.form.valid) {
            this.fileService.addFile(files, this.form.value.password);
        }
        else {
            this.validateAllFormFields(this.form);
        }
    }

}