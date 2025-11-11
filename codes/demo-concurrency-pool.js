// codes/demo-concurrency-pool.js
const { performance } = require('perf_hooks');

function fakeRequest(id) {
  return new Promise((res) => {
    setTimeout(() => res(`ok:${id}`), 100 + Math.random() * 400);
  });
}

async function runWithConcurrency(taskFns, concurrency = 5) {
  const results = new Array(taskFns.length);
  let nextIndex = 0;

  async function worker() {
    while (true) {
      const i = nextIndex++;
      if (i >= taskFns.length) return;
      try {
        const r = await taskFns[i]();
        results[i] = r;
      } catch (err) {
        results[i] = { error: String(err) };
      }
    }
  }

  const pool = Array.from({ length: concurrency }, () => worker());
  await Promise.all(pool);
  return results;
}

(async () => {
  const tasks = Array.from({ length: 20 }, (_, i) => () => fakeRequest(i + 1));
  console.time('concurrent-run');
  const t0 = performance.now();
  const out = await runWithConcurrency(tasks, Number(process.argv[2] || 4));
  const t1 = performance.now();
  console.timeEnd('concurrent-run');
  console.log('elapsed ms', Math.round(t1 - t0));
  console.log(out.slice(0, 5), '... total', out.length);
})();