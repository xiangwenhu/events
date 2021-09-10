/**
 *  node v12.14.1  64bit
*/

const arr = Array.from({ length: 100 * 10000 }, function (v, index) {
    return Math.random();
})

function spliceOne(list, index) {
    for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
    list.pop(), index
}

function splice(list, index) {
    return list.splice(index, 1);
}

function test(tag, arr, fun, index) {
    console.time(tag);
    const mS = process.memoryUsage();
    fun(arr, index)
    const mE = process.memoryUsage();
    // console.log(mE)
    console.log({
        rss: mE.rss - mS.rss,
        heapUsed: mE.heapUsed - mS.heapUsed,
        external: mE.external - mS.external
    })
    console.timeEnd(tag);
}


// 记住了，不能同时执行，注释一个执行另外一个

test("spliceOne", arr, spliceOne, 989000)

// test("splice", arr, splice, 999999)