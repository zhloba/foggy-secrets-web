import { Component, OnInit } from "@angular/core";
import { CryptoService } from './shared/crypto.service'

@Component({
    moduleId: module.id,
    selector: "app",
    templateUrl: "app.component.html" 
})
export class AppComponent {
    name = "";
    isBrowserSupported = true;

    constructor(private cryptoService: CryptoService) {        
    }

    ngOnInit() {
        let ctx = this;
        this.cryptoService.isBrowserSupported().then(function (value) {
            ctx.isBrowserSupported = value;
        });
    }
}