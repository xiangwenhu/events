

### 100*10000 index:0

spliceOne
```js
{ rss: 184320, heapUsed: 143264, external: 32 }
spliceOne: 9.944ms

{ rss: 200704, heapUsed: 143264, external: 32 }
spliceOne: 8.914ms

{ rss: 192512, heapUsed: 143264, external: 32 }
spliceOne: 9.525ms
```

splice
```js
{ rss: 12288, heapUsed: 1404, external: 32 }
splice: 7.395ms

{ rss: 12288, heapUsed: 1404, external: 32 }
splice: 7.554ms


{ rss: 12288, heapUsed: 1404, external: 32 }
splice: 8.603ms
```

### 100*10000 index: 500000

spliceOne
```js
{ rss: 172032, heapUsed: 143264, external: 32 }
spliceOne: 9.215ms

{ rss: 151552, heapUsed: 143264, external: 32 }
spliceOne: 9.707ms

{ rss: 65536, heapUsed: 143264, external: 32 }
spliceOne: 8.478ms

```

splice
```js
{ rss: 12288, heapUsed: 1404, external: 32 }
splice: 6.889ms

{ rss: 12288, heapUsed: 1404, external: 32 }
splice: 8.394ms

{ rss: 12288, heapUsed: 1404, external: 32 }
splice: 7.614ms

```

### 100*10000 index: 999999
spliceOne
```js
{ rss: 0, heapUsed: 1452, external: 32 }
spliceOne: 5.899ms

{ rss: 0, heapUsed: 1452, external: 32 }
spliceOne: 7.152ms

{ rss: 0, heapUsed: 1452, external: 32 }
spliceOne: 6.844ms
```

splice
```js

{ rss: 12288, heapUsed: 1404, external: 32 }
splice: 6.777ms

{ rss: 12288, heapUsed: 1404, external: 32 }
splice: 7.627ms

{ rss: 12288, heapUsed: 1404, external: 32 }
splice: 6.180ms



```