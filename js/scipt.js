"use strict";

function cacheWrapper(func) {
  const cache = new Map();

  return function () {
    let key = JSON.stringify([...arguments]);
    if (cache.has(key)) {
      console.log("Took from cache");
      return cache.get(key);
    }
    const result = func(...arguments);

    if (cache.size === 10) {
      let keys = cache.keys();
      cache.delete(keys.next().value);
    }

    cache.set(key, result);
    console.log("invoked function");
    console.log(cache);

    return result;
  };
}

let test1 = cacheWrapper(mult);

console.log(test1(2, 3));
console.log(test1(3, 4));
console.log(test1(2, 4));
console.log(test1(2, 5));
console.log(test1(1, 3));
console.log(test1(3, 2));
console.log(test1(1, 2));
console.log(test1(3, 5));
console.log(test1(4, 5));
console.log(test1(2, 3));
console.log(test1(40, 15));
console.log(test1(10, 2));
console.log(test1(9, 2));
console.log(test1(10, 4));

function sum(x, y) {
  return x + y;
}

function mult(x, y) {
  return x * y;
}
