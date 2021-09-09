const emitter = require('./emitter');

emitter.on("event1", function() {
    console.log("event1:111")
})

emitter.prependListener("event1", function(event) {
    console.log("event1:222")
})

emitter.emit("event1")

