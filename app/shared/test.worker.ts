
console.log('hello from a webworker');

addEventListener('message', (message) => {
    console.log('in webworker', message);
    postMessage.apply(null, 'this is the response ' + message.data);
    //this.postMessage('this is the response 2 ' + message.data);
});