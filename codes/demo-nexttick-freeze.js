// codes/demo-nexttick-freeze.js
let i = 0;
function repeat() {
  if (i++ < 20) {
    console.log('nextTick', i);
    process.nextTick(repeat);
  } else {
    console.log('done nextTick');
  }
}

console.log('start');
repeat();
console.log('end');