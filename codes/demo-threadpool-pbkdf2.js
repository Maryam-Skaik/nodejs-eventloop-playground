// codes/demo-threadpool-pbkdf2.js
const crypto = require('crypto');
const { performance } = require('perf_hooks');

const iterations = Number(process.argv[2] || 8);
const size = Number(process.env.UV_THREADPOOL_SIZE || 4);

console.log('UV_THREADPOOL_SIZE =', size);
console.log('doing', iterations, 'pbkdf2 tasks');

function run(n) {
  return new Promise((res, rej) => {
    const t0 = performance.now();
    crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
      const t1 = performance.now();
      if (err) return rej(err);
      res(Math.round(t1 - t0));
    });
  });
}

(async () => {
  const tasks = Array.from({ length: iterations }, (_, i) => () => run(i));
  const t0 = performance.now();
  const results = await Promise.all(tasks.map(fn => fn()));
  const t1 = performance.now();
  console.log('individual ms:', results);
  console.log('total elapsed ms', Math.round(t1 - t0));
})();
