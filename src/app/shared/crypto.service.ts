import { FileInfo } from '../shared/file-info'
import { FileStatus } from '../shared/file-status'
import { Observable } from 'rxjs/Rx'
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class CryptoService {

    constructor() {
    }

    isBrowserSupported(): Promise<boolean> {
        let cryptoMethods = {
            encrypt: null,
            decrypt: null,
            generateKey: null,
            hmacSign: null,
            hmacVerify: null,
            hmacImportKey: null,
            sha1: null,
            deriveKey: null,
            deriveBits: null
        };

        try {
            //encrypt
            cryptoMethods.encrypt = window.crypto.subtle.generateKey({ name: "AES-CBC", length: 256 }, false, ["encrypt"])
                .then(function (key) {
                    return window.crypto.subtle.encrypt({
                        name: "AES-CBC",
                        iv: window.crypto.getRandomValues(new Uint8Array(16)),
                    }, key, new Uint8Array([1, 2, 3, 4]));
                })
                .then(function () { return true; });

            //decrypt
            cryptoMethods.decrypt = window.crypto.subtle.generateKey({ name: "AES-CBC", length: 256 }, false, ["encrypt", "decrypt"])
                .then(function (key) {
                    var iv = window.crypto.getRandomValues(new Uint8Array(16));
                    return window.crypto.subtle.encrypt({
                        name: "AES-CBC",
                        iv: iv,
                    }, key, new Uint8Array([1, 2, 3, 4]))
                        .then(function (encrypted) {
                            return window.crypto.subtle.decrypt({
                                name: "AES-CBC",
                                iv: iv,
                            }, key, encrypted);
                        })
                        .then(function () { return true; });
                });

            //256 bits
            cryptoMethods.generateKey = window.crypto.subtle.generateKey({
                name: "AES-CBC",
                length: 256,
            }, false, ["encrypt", "decrypt"])
                .then(function () { return true; });

            //digest
            cryptoMethods.sha1 = window.crypto.subtle.digest({ name: "SHA-1" }, new Uint8Array([1, 2, 3, 4]))
                .then(function () { return true; });

            //deriveKey
            var password = window.crypto.getRandomValues(new Uint8Array(16));
            cryptoMethods.deriveKey = window.crypto.subtle.importKey("raw", password, { name: "PBKDF2" }, false, ["deriveBits", "deriveKey"])
                .then(function (key) {
                    //sha-1
                    return window.crypto.subtle.deriveKey({
                        name: "PBKDF2",
                        salt: window.crypto.getRandomValues(new Uint8Array(16)),
                        iterations: 1000,
                        hash: { name: "SHA-1" },
                    }, key, { name: "AES-CBC", length: 256 }, false, ["encrypt", "decrypt"])
                        .then(function () { return true; });
                });

            //deriveBits
            var password = window.crypto.getRandomValues(new Uint8Array(16));
            cryptoMethods.deriveBits = window.crypto.subtle.importKey("raw", password, { name: "PBKDF2" }, false, ["deriveBits", "deriveKey"])
                .then(function (key) {
                    //sha-1
                    return window.crypto.subtle.deriveBits({
                        "name": "PBKDF2",
                        salt: window.crypto.getRandomValues(new Uint8Array(16)),
                        iterations: 1000,
                        hash: { name: "SHA-1" },
                    }, key, 128)
                        .then(function () { return true; });
                });

            //HMAC sign
            cryptoMethods.hmacSign = window.crypto.subtle.generateKey({ name: "HMAC", hash: { name: "SHA-1" } }, false, ["sign"])
                .then(function (key) {
                    return window.crypto.subtle.sign({ name: "HMAC", hash: { name: "SHA-1" } }, key, new Uint8Array([1, 2, 3, 4]));
                })
                .then(function () { return true; });

            //HMAC verify
            cryptoMethods.hmacVerify = window.crypto.subtle.generateKey({ name: "HMAC", hash: { name: "SHA-1" } }, false, ["sign", "verify"])
                .then(function (key) {
                    return window.crypto.subtle.sign({ name: "HMAC", hash: { name: "SHA-1" } }, key, new Uint8Array([1, 2, 3, 4]))
                        .then(function (sig) {
                            return window.crypto.subtle.verify({ name: "HMAC", hash: { name: "SHA-1" } }, key, sig, new Uint8Array([1, 2, 3, 4]));
                        })
                        .then(function () { return true; });
                });

            //importKey
            //raw
            cryptoMethods.hmacImportKey = window.crypto.subtle.importKey("raw", new Uint8Array([
                122, 94, 39, 230, 46, 23, 151, 80, 131, 230, 3, 101, 80, 234, 143, 9, 251,
                152, 229, 228, 89, 222, 31, 135, 214, 104, 55, 68, 67, 59, 5, 51
            ]), { name: "HMAC", hash: { name: "SHA-1" } }, false, ["sign", "verify"])
                .then(function () { return true; });

        }
        catch (ex) {
            console.error('isBrowserSupported', ex.message);
        }


        return Promise.all<boolean>(_.valuesIn(cryptoMethods))
            .then(function (values: boolean[]) {
                return _.every(values, function (value) { return value; });
            });
    }

    getHash(file: File): PromiseLike<Uint8Array> {

        if (file.size > 50 * 1024 * 1024)
            return new Promise<Uint8Array>(function (resolve, reject) { reject("Size more then 50 Mb!"); });

        let context = this;
        let reader = new FileReader();
        return new Promise<Uint8Array>(function (resolve, reject) {
            reader.onload = function () {

                resolve(window.crypto.subtle.digest(
                    {
                        name: "SHA-1",
                    },
                    reader.result //The data you want to hash as an ArrayBuffer
                )
                    .then(function (hash) {
                        //returns the hash as an ArrayBuffer
                        return new Uint8Array(hash);
                    }));
            }
            reader.readAsArrayBuffer(file);
        });
    }

    verifyHMAC(data: Uint8Array, signature: Uint8Array, password: Uint8Array): PromiseLike<boolean> {
        return window.crypto.subtle.importKey(
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

                return window.crypto.subtle.verify(
                    "HMAC",
                    key,
                    signature,
                    data
                )
                    .then(function (isValid) {
                        //returns a boolean on whether the signature is true or not                
                        //console.log(isValid);               
                        return isValid;
                    });

            });
    }

    getHMAC(data: Uint8Array, password: Uint8Array): PromiseLike<Uint8Array> {

        return window.crypto.subtle.importKey(
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

                return window.crypto.subtle.sign(
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
                    });
            });
    }

    isValidEncrypredFile(file: File, password: Uint8Array): PromiseLike<boolean> {

        if (file.size < 56)
            return new Promise<boolean>(function (resolve, reject) { resolve(false); });

        let self = this;
        let reader = new FileReader();
        return new Promise<boolean>(function (resolve, reject) {
            reader.onload = function () {
                let hash = reader.result.slice(0, 20);
                let hmac = reader.result.slice(20, 40);

                //console.log(new Uint8Array(hash));
                //console.log(new Uint8Array(hmac));
                //console.log(context.toHexString(new Uint8Array(hmac)));

                resolve(self.verifyHMAC(hash, hmac, password));
            }
            reader.readAsArrayBuffer(file.slice(0, 40));
        });
    }

    encrypt(file: File, password: Uint8Array): PromiseLike<ArrayBuffer> {

        let self = this;
        let salt = new Uint8Array(16);
        window.crypto.getRandomValues(salt);

        return new Promise<ArrayBuffer>(function (resolve, reject) {
            let reader = new FileReader();

            reader.onload = function () {

                let res = self.getHash(file).then(function (hash) {
                    return self.getHMAC(hash, password).then(function (hmac) {

                        let keyPromise = self.deriveKey(password, salt, 100, 'AES-CBC', 256);
                        let ivPromise = self.deriveBits(password, salt, 100, 128);

                        return self.deriveKey(password, salt, 100, 'AES-CBC', 256).then(function (key) {
                            return self.deriveBits(password, salt, 100, 128).then(function (iv) {
                                return window.crypto.subtle.encrypt({
                                    name: "AES-CBC",
                                    //Don't re-use initialization vectors!
                                    //Always generate a new iv every time your encrypt!
                                    iv: iv
                                },
                                    key, //from generateKey or importKey above
                                    reader.result //ArrayBuffer of data you want to encrypt
                                )
                                    .then(function (encrypted) {
                                        //returns an ArrayBuffer containing the encrypted data

                                        let encArray = new Uint8Array(encrypted);
                                        let result = new Uint8Array(encArray.length + + hash.length + hmac.length + salt.length);
                                        result.set(hash);
                                        result.set(hmac, hash.length);
                                        result.set(salt, hash.length + hmac.length);
                                        result.set(encArray, hash.length + hmac.length + salt.length);

                                        return result.buffer as ArrayBuffer;

                                    });
                            });
                        });
                    });
                });

                resolve(res);

            };
            reader.readAsArrayBuffer(file);
        });
    }


    decrypt(file: File, password: Uint8Array): PromiseLike<ArrayBuffer> {

        let self = this;
        let reader = new FileReader();

        return new Promise<ArrayBuffer>(function (resolve, reject) {
            reader.onload = function () {
                let salt = reader.result.slice(40, 56);
                let keyPromise = self.deriveKey(password, salt, 100, 'AES-CBC', 256);
                let ivPromise = self.deriveBits(password, salt, 100, 128);

                return Promise.all([keyPromise, ivPromise]).then(
                    function (results) {
                        let res = window.crypto.subtle.decrypt({
                            name: "AES-CBC",
                            //Don't re-use initialization vectors!
                            //Always generate a new iv every time your encrypt!
                            iv: results[1]
                        },
                            results[0], //from generateKey or importKey above
                            reader.result.slice(56) //ArrayBuffer of data you want to decrypt
                        );
                        resolve(res);
                    }
                );
            };

            reader.readAsArrayBuffer(file);
        });
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

    private deriveKey(password: Uint8Array, salt: Uint8Array, iterations: number, algorithm: string, length: number): PromiseLike<CryptoKey> {
        return window.crypto.subtle.importKey(
            "raw", //only "raw" is allowed
            password, //your password
            {
                name: "PBKDF2",
            },
            false, //whether the key is extractable (i.e. can be used in exportKey)
            ["deriveKey", "deriveBits"] //can be any combination of "deriveKey" and "deriveBits"
        )
            .then(function (key) {
                return window.crypto.subtle.deriveKey(
                    {
                        "name": "PBKDF2",
                        salt: salt,
                        iterations: iterations,
                        hash: { name: "SHA-1" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
                    },
                    key, //your key from generateKey or importKey
                    { //the key type you want to create based on the derived bits
                        name: "AES-CBC", //can be any AES algorithm ("AES-CTR", "AES-CBC", "AES-CMAC", "AES-GCM", "AES-CFB", "AES-KW", "ECDH", "DH", or "HMAC")
                        //the generateKey parameters for that type of algorithm
                        length: length, //can be  128, 192, or 256
                    },
                    false, //whether the derived key is extractable (i.e. can be used in exportKey)
                    ["encrypt", "decrypt"] //limited to the options in that algorithm's importKey
                )
                    .then(function (key) {
                        return key;
                    });
            });
    }

    private deriveBits(password: Uint8Array, salt: Uint8Array, iterations: number, length: number): PromiseLike<Uint8Array> {
        return window.crypto.subtle.importKey(
            "raw", //only "raw" is allowed
            password, //your password
            {
                name: "PBKDF2",
            },
            false, //whether the key is extractable (i.e. can be used in exportKey)
            ["deriveKey", "deriveBits"] //can be any combination of "deriveKey" and "deriveBits"
        )
            .then(function (key) {
                return window.crypto.subtle.deriveBits(
                    {
                        "name": "PBKDF2",
                        salt: salt,
                        iterations: iterations,
                        hash: { name: "SHA-1" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
                    },
                    key, //your key from generateKey or importKey
                    length
                )
                    .then(function (key) {
                        return new Uint8Array(key);
                    });
            });
    }
}