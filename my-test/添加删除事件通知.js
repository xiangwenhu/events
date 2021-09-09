const emitter = require('./emitter');

function once() {
    console.log('once')
}
function event2() {
    console.log('event2')
}
emitter.on("newListener", function () {
    console.log('newListener', [...arguments])
})

emitter.on("removeListener", function () {
    console.log('removeListener', [...arguments])
})

emitter.once('event1', once)
emitter.on('event2', event2)
emitter.off('event1', once)

// emitter.emit("event1")



