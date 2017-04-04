"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var file_info_1 = require('../shared/file-info');
var file_status_1 = require('../shared/file-status');
var FileItemComponent = (function () {
    function FileItemComponent() {
        this.fileStatus = file_status_1.FileStatus;
        this.fileInfo = new file_info_1.FileInfo('test', file_status_1.FileStatus.Encrypted, 6543, new Date(), 70);
    }
    FileItemComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'file-item',
            templateUrl: 'file-item.component.html',
            styleUrls: ['file-item.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], FileItemComponent);
    return FileItemComponent;
}());
exports.FileItemComponent = FileItemComponent;
//# sourceMappingURL=file-item.component.js.map