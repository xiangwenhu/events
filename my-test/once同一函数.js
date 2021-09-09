const emitter = require('./emitter');

function once(){
    console.log('once')
}

emitter.once('event1', once)
emitter.once('event1', once)
emitter.once('event1', once)
emitter.once('event1', once)


emitter.emit("event1")
console.log("emit again");
emitter.emit("event1")


