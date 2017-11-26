import { FileInfo } from '../shared/file-info'
import { FileStatus } from '../shared/file-status'
import { Observable } from 'rxjs/Rx'

//import * as workerPath from "file-loader?name=[name].js!./test.worker";

export class CryptoService {
    isValidEncrypredFile(file: File) {
        
    }

    encrypt(file: File) {

    }

    decrypt(file: File) {

    }

    doSomething(file: FileInfo) {
        //let workerPath = "test.worker.ts";

        var numbers = Observable.timer(3000, 1000);
        numbers.subscribe(x => { 
            if (file.progress >= 100) {
                file.status = FileStatus.Decrypted;
                return;
            }
 
            file.progress === null ? file.progress = 0 : file.progress +=  10;
            console.log(file.progress);
        });

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