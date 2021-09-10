/**
 *  node v12.14.1  64bit
*/

const arr = Array.from({ length: 100 * 10000 }, function (v, index) {
    return Math.random();
})


function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
    return copy;
}

function slice(arr, n) {
    return arr.slice(0, n)
}

function test(tag, arr, len = arr.length, fun) {
    console.time(tag);
    const mS = process.memoryUsage();
    fun(arr, len);
    const mE = process.memoryUsage();
    // console.log(mE)
    console.log({
        rss: mE.rss - mS.rss,
        heapUsed: mE.heapUsed - mS.heapUsed,
        external: mE.external - mS.external
    })
    console.timeEnd(tag);
}

// test("copy", arr, arr.length, arrayClone)

test("slice", arr, arr.length, slice)