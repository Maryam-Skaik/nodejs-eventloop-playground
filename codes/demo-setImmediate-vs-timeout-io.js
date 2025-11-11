// codes/demo-setImmediate-vs-timeout-io.js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout 0'), 0);
  setImmediate(() => console.log('setImmediate'));
  // add a tiny async operation to show ordering
  Promise.resolve().then(() => console.log('promise inside IO'));
});
