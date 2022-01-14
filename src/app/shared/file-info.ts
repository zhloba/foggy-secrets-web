import { FileStatus } from './file-status'

export interface IFileInfo {
    name: string;
    status: FileStatus;
    size: number;
    lastModified: number;
    progress: number;
    file: File; 
}

export class FileInfo implements IFileInfo {
    constructor(
        public name: string,
        public status: FileStatus,
        public size: number,
        public lastModified: number,
        public progress: number,
        public file: File) {}
}