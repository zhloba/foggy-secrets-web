import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { UploadFormComponent } from './upload-form/upload-form.component'
import { DragAndDropUploadDirective } from './upload-form/drag-and-drop-upload.directive'
import { FilesListComponent } from './files-list/files-list.component'
import { FileItemComponent } from './file-item/file-item.component'
import { FileService } from './shared/file.service'
import { CryptoService } from './shared/crypto.service'
import { EncodingService } from './shared/encoding.service'

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
    providers: [ FileService, CryptoService, EncodingService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }