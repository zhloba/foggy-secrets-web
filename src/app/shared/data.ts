import { IFileInfo, FileInfo } from './file-info'
import { FileStatus } from './file-status'

export const files: IFileInfo[] = [
    {
        name: 'test-file-1.txt',
        status: FileStatus.Encrypted,
        size: 7855,
        date: new Date(),
        progress: 0,
        file: null     
    },
    {
        name: 'test-file-2.txt',
        status: FileStatus.Decrypting,
        size: 1245,
        date: new Date(),
        progress: 90,
        file: null   
    }
]