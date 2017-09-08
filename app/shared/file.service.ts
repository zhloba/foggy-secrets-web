import { FileInfo } from '../shared/file-info'
import { FileStatus } from '../shared/file-status'
import { files } from '../shared/data'
import { CryptoService } from '../shared/crypto.service'
import { Injectable } from '@angular/core';

@Injectable()
export class FileService {

    constructor(private cryptoService: CryptoService) {

    }

    files: FileInfo[] = files;

    getFiles(): FileInfo[] {
        return this.files;
    }

    addFile(filesList: File[]) {
        for (var i = 0; i < filesList.length; i++) {
            
            let file: FileInfo = new FileInfo(
                filesList[i].name,
                FileStatus.Decrypted,
                filesList[i].size,
                filesList[i].lastModifiedDate,
                0,
                filesList[i]
            );

            this.files.push(file);

            this.cryptoService.doSomething();
        }
    }

    deleteFile(file: FileInfo) {
        let index = this.files.indexOf(file);
        if (index > -1)
            this.files.splice(index, 1);
    }

}