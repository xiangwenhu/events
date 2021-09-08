### 几个注意点

1. 事件处理程序里面可以再监听
   

2. 时间程序程序里面可以再emit
   
3. 所谓的once，即便是同一个函数多次once，也会是被多次执行的。 
  
   

redux的设计则派发(dispatch)的事件处理程序里面不允许再
[subscribe](https://github.com/reduxjs/redux/blob/4.x/src/createStore.js#L137) 和 [dispatch](https://github.com/reduxjs/redux/blob/4.x/src/createStore.js#L212)。



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