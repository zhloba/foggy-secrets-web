import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { UploadFormComponent } from './upload-form/upload-form.component'
import { FilesListComponent } from './files-list/files-list.component'
import { FileItemComponent } from './file-item/file-item.component'

@NgModule({
    imports: [
         BrowserModule,
         FormsModule 
    ],
    declarations: [
         AppComponent,
         UploadFormComponent,
         FilesListComponent,
         FileItemComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }