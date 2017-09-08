import { FileStatus } from './file-status'

export interface IFileInfo {
    name: string;
    status: FileStatus;
    size: number;
    date: Date;
    progress: number;
    file: File; 
}

export class FileInfo implements IFileInfo {
    constructor(
        public name: string,
        public status: FileStatus,
        public size: number,
        public date: Date,
        public progress: number,
        public file: File) {}
}