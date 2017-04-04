"use strict";
var file_status_1 = require('./file-status');
exports.files = [
    {
        name: 'test-file-1.txt',
        status: file_status_1.FileStatus.Encrypted,
        size: 7855,
        date: new Date(),
        progress: 0
    },
    {
        name: 'test-file-2.txt',
        status: file_status_1.FileStatus.Decrypting,
        size: 1245,
        date: new Date(),
        progress: 90
    }
];
//# sourceMappingURL=data.js.map