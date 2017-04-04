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
var data_1 = require('../shared/data');
var FilesListComponent = (function () {
    function FilesListComponent() {
        this.files = data_1.files;
    }
    FilesListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'files-list',
            templateUrl: 'files-list.component.html',
            styleUrls: ['files-list.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], FilesListComponent);
    return FilesListComponent;
}());
exports.FilesListComponent = FilesListComponent;
//# sourceMappingURL=files-list.component.js.map