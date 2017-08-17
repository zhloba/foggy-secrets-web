import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { UploadFormComponent } from './upload-form/upload-form.component'
import { DragAndDropUploadDirective } from './upload-form/drag-and-drop-upload.directive'
import { FilesListComponent } from './files-list/files-list.component'
import { FileItemComponent } from './file-item/file-item.component'
import { FileService } from './shared/file.service'

@NgModule({
    imports: [
         BrowserModule,
         FormsModule 
    ],
    declarations: [
         AppComponent,
         UploadFormComponent,
         DragAndDropUploadDirective,
         FilesListComponent,
         FileItemComponent
    ],
    providers: [ FileService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }