"use strict";
var FileInfo = (function () {
    function FileInfo(name, status, size, date, progress) {
        this.name = name;
        this.status = status;
        this.size = size;
        this.date = date;
        this.progress = progress;
    }
    return FileInfo;
}());
exports.FileInfo = FileInfo;
//# sourceMappingURL=file-info.js.map