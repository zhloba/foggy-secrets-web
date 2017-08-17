import { FileInfo } from '../shared/file-info'
import { FileStatus } from '../shared/file-status'
import { files } from '../shared/data'

export class FileService {
    files: FileInfo[] = files;

    getFiles(): FileInfo[] {
        return this.files;
    }

    addFile(filesList: File[]) {
        for (var i = 0; i < filesList.length; i++) {
            this.files.push(new FileInfo(
                filesList[i].name,
                FileStatus.Decrypted,
                filesList[i].size,
                filesList[i].lastModifiedDate,
                0
            ));
        }
    }

    deleteFile(file: FileInfo) {
        let index = this.files.indexOf(file);
        if (index > -1)
            this.files.splice(index, 1);
    }

}