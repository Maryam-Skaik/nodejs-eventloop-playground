// codes/demo-promise-loop.js

let promiseCounter = 0;
let nextTickCounter = 0;

// --- Promise-based recursion ---
function repeatPromise() {
  if (promiseCounter < 20) {
    Promise.resolve().then(() => {
      console.log('promise', promiseCounter++);
      repeatPromise();
    });
  } else {
    console.log('done promise');
  }
}

// --- nextTick-based recursion ---
function repeatNextTick() {
  function next() {
    if (nextTickCounter < 20) {
      console.log('nextTick', nextTickCounter++);
      process.nextTick(next);
    } else {
      console.log('done nextTick');
    }
  }
  next();
}

console.log('--- Promises ---');
repeatPromise();
console.log('after promise scheduling');

console.log('--- NextTick ---');
repeatNextTick();
console.log('after nextTick scheduling');
