import { FileInfo } from '../shared/file-info'
import { FileStatus } from '../shared/file-status'
import { EncodingService } from '../shared/encoding.service'
import { files } from '../shared/data'
import { CryptoService } from '../shared/crypto.service'
import { Injectable } from '@angular/core';

@Injectable()
export class FileService {

    constructor(private cryptoService: CryptoService, private encodingService: EncodingService) {

    }

    files: FileInfo[] = files;

    getFiles(): FileInfo[] {
        return this.files;
    }

    addFile(filesList: File[], password: string) {
        for (var i = 0; i < filesList.length; i++) {
            
            let file: FileInfo = new FileInfo(
                filesList[i].name,
                FileStatus.Encrypted,
                filesList[i].size,
                filesList[i].lastModifiedDate,
                0,
                filesList[i]
            );

            this.files.push(file);
            let passwordByteArray = this.encodingService.toUTF8Array(password);

            this.cryptoService.isValidEncrypredFile(file.file, passwordByteArray).then(
                function(isValid) {
                    console.log(isValid);
                }
            );

            let ctx = this;
            
            this.cryptoService.getHash(file.file).then(
                function (hash: Uint8Array) {
                    console.log(hash);
                    console.log(ctx.encodingService.toHexString(hash));
                    console.log(ctx.encodingService.toBase64(hash));
                }
            );

            this.cryptoService.encrypt(file.file, passwordByteArray)
            .then(function (data){    
                
                file.file = new File([data], file.file.name, { type: file.file.type  });
                console.log(URL.createObjectURL(file.file));
            });
        }
    }

    deleteFile(file: FileInfo) {
        let index = this.files.indexOf(file);
        if (index > -1)
            this.files.splice(index, 1);
    }

}