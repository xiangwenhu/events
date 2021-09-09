### 几个注意点

1. 某类型事件处理程序里面， 可以再增加某类型的事件处理程序，下次生效
```js
emitter.on('event1', function (err) {
    console.log("event1");
    emitter.on('event1', function (err) {
        console.log("event1 again");
    })
})
```
   

2. 某类型事件程序程序里面可以再emit， 结果就是死循环
```js
emitter.on('event1', function (err) {
    console.log("event1");
    emitter.emit('event1', function (err) {
        console.log("event1 again"); 
    })
})
```
   
3. 所谓的once，即便是同一个函数多次once，也会是被多次执行的。 
```js
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

```

4. 添加和删除事件，是有事件通知的
```js
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

```

5. prependListener，添加到队首
```js
const emitter = require('./emitter');

emitter.on("event1", function() {
    console.log("event1:111")
})

emitter.prependListener("event1", function(event) {
    console.log("event1:222")
})

emitter.emit("event1")
```
   

redux的设计则派发(dispatch)的事件处理程序里面不允许再
[subscribe](https://github.com/reduxjs/redux/blob/4.x/src/createStore.js#L137) 和 [dispatch](https://github.com/reduxjs/redux/blob/4.x/src/createStore.js#L212)。

6. 还暴露了一个全局的基于Promise的once，
   需要传入一个Emitter, EventTarget也支持



## 代码思考点

1. 如何获得一个对象上的所有键
兼容高低版本，也可以得出结论
`Reflect.ownKeys ` =  `Object.getOwnPropertyNames + Object.getOwnPropertySymbols`
```js
var R = typeof Reflect === 'object' ? Reflect : null
var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}
```

2. 判断NaN
`NaN`的特点就是自身不等于自身
```js
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}
```

3. 创建纯净对象
以null为原型创建对象`Object.create(null)`，即为纯净对象。
```js
EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};
```

4. 对有参和无参的调用，做了区分，性能问题？
```js
function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}
```

5. 其内部对单个监听事件，once，和事件列表做了区分


6. 数组拷贝没采用slice，而是循环拷贝


7. 数组删除某项没采用splice，而是采取了遍历复制和pop

8. onceWraper和原本的监听的关联, wraper.listener指向原本的
```js
function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}
```

另外的一种显现方式，所有的都保存为一个对象，例如
```js
{
  listener: listener,
  once: once
}
```
