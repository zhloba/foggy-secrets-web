"use strict";
(function (FileStatus) {
    FileStatus[FileStatus["Encrypting"] = 0] = "Encrypting";
    FileStatus[FileStatus["Encrypted"] = 1] = "Encrypted";
    FileStatus[FileStatus["Decrypting"] = 2] = "Decrypting";
    FileStatus[FileStatus["Decrypted"] = 3] = "Decrypted";
})(exports.FileStatus || (exports.FileStatus = {}));
var FileStatus = exports.FileStatus;
//# sourceMappingURL=file-status.js.map