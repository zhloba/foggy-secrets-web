import { FileInfo } from '../shared/file-info'
import { FileStatus } from '../shared/file-status'
import { Observable } from 'rxjs/Rx'
import { Injectable } from '@angular/core';

//import * as workerPath from "file-loader?name=[name].js!./test.worker";

@Injectable()
export class CryptoService {

    constructor() {
    }

    getHash(file: File): Promise<Uint8Array> {

        if (file.size > 50 * 1024 * 1024)
            return new Promise<Uint8Array>(function (resolve, reject) { reject("Size more then 50 Mb!"); });

        let context = this;
        let reader = new FileReader();
        return new Promise<Uint8Array>(function (resolve, reject) {
            reader.onload = function () {

                resolve((window.crypto.subtle.digest(
                    {
                        name: "SHA-1",
                    },
                    reader.result //The data you want to hash as an ArrayBuffer
                )
                .then(function (hash) {
                    //returns the hash as an ArrayBuffer
                    return new Uint8Array(hash);
                }) as Promise<Uint8Array>)
                .catch(function (err) {
                    console.error(err);
                }));
            }
            reader.readAsArrayBuffer(file);
        });
    }

    verifyHMAC(data: Uint8Array, signature: Uint8Array, password: Uint8Array): Promise<boolean> {
        return (window.crypto.subtle.importKey(
            "raw",
            password,
            {   //this is the algorithm options
                name: "HMAC",
                hash: { name: "SHA-1" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
                //length: 256, //optional, if you want your key length to differ from the hash function's block length
            },
            false, //whether the key is extractable (i.e. can be used in exportKey)
            ["sign", "verify"] //can be any combination of "sign" and "verify"
        )
            .then(function (key) {

                //returns the symmetric key
                //console.log(key);

                return (window.crypto.subtle.verify(
                    "HMAC",
                    key,
                    signature,
                    data
                )
                    .then(function (isValid) {
                        //returns a boolean on whether the signature is true or not                
                        //console.log(isValid);               
                        return isValid;
                    }) as Promise<boolean>)
                    .catch(function (err) {
                        console.error(err);
                    });

            }) as Promise<boolean>)
            .catch(function (err) {
                console.error(err);
            });
    }

    getHMAC(data: Uint8Array, password: Uint8Array): Promise<Uint8Array> {

        return (window.crypto.subtle.importKey(
            "raw",
            password,
            {   //this is the algorithm options
                name: "HMAC",
                hash: { name: "SHA-1" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
                //length: 256, //optional, if you want your key length to differ from the hash function's block length
            },
            false, //whether the key is extractable (i.e. can be used in exportKey)
            ["sign", "verify"] //can be any combination of "sign" and "verify"
        )
            .then(function (key) {

                //returns the symmetric key
                //console.log(key);

                return (window.crypto.subtle.sign(
                    "HMAC",
                    key,
                    data
                )
                    .then(function (signature) {
                        //returns an ArrayBuffer containing the signature
                        let result = new Uint8Array(signature);
                        //console.log(result);
                        //console.log(this.toHexString(result));
                        return result;
                    }) as Promise<Uint8Array>)
                    .catch(function (err) {
                        console.error(err);
                    });

            }) as Promise<Uint8Array>)
            .catch(function (err) {
                console.error(err);
            });
    }

    isValidEncrypredFile(file: File, password: Uint8Array): Promise<boolean> {

        if (file.size < 56)
            return new Promise<boolean>(function (resolve, reject) { resolve(false); });

        let context = this;
        let reader = new FileReader();
        return new Promise<boolean>(function (resolve, reject) {
            reader.onload = function () {
                let hash = reader.result.slice(0, 20);
                let hmac = reader.result.slice(20, 40);

                //console.log(new Uint8Array(hash));
                //console.log(new Uint8Array(hmac));
                //console.log(context.toHexString(new Uint8Array(hmac)));

                resolve(context.verifyHMAC(hash, hmac, password));
            }
            reader.readAsArrayBuffer(file.slice(0, 40));
        });
    }

    encrypt(file: File) {

    }

    decrypt(file: File) {

    }

    doSomething(file: FileInfo, password: Uint8Array) {
        //let workerPath = "test.worker.ts";

        // var numbers = Observable.timer(3000, 1000);
        // numbers.subscribe(x => { 
        //     if (file.progress >= 100) {
        //         file.status = FileStatus.Decrypted;
        //         return;
        //     }

        //     file.progress === null ? file.progress = 0 : file.progress +=  10;
        //     console.log(file.progress);
        // });



        //console.log(this.isValidEncrypredFile(file.file, password));



        // var blob = new Blob([
        //     //onmessage = function(e) { postMessage.apply(null,'msg from worker'); }

        //     onmessage = function(message) {
        //         console.log('in webworker', message);
        //         postMessage.apply(null, 'this is the response ' + message.data);
        //     }           


        //   ], { type: "text/javascript" });       

        // // Obtain a blob URL reference to our worker 'file'.
        // // Note: window.webkitURL.createObjectURL() in Chrome 10+.
        // var blobURL = window.URL.createObjectURL(blob);

        // let worker = new Worker (blobURL);
        // worker.onmessage = function(message) {
        //     console.log(message);
        // }

        // // worker.addEventListener('message', message => {
        // //     console.log(message);
        // // });
        // worker.postMessage('this is a test message to the worker');
        // console.log(blobURL, worker);
    }
}