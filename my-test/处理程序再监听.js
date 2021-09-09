const emitter = require('./emitter');

emitter.on('event1', function (err) {
    console.log("event1");
    emitter.on('event1', function (err) {
        console.log("event1 again");
    })
})


emitter.emit("event1")

// emitter.emit("event1")


