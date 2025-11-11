
# 🧠 Node.js Async Internals — Code Demos

This folder contains small, focused demos exploring **asynchronous behavior**, **event loop phases**, and **libuv mechanisms** in Node.js.
Each file highlights a distinct concept from microtasks and macrotasks to thread pool parallelism.

---

## ⚙️ 1. `demo-concurrency-pool.js`

**Concept:** Logical concurrency using async/await and controlled parallel execution.

**What it shows:**

- How to build a **concurrency pool** that runs multiple asynchronous tasks at once, but limits how many are active simultaneously.
- Simulates I/O-like operations using `setTimeout()` to represent variable latency.
- Demonstrates that concurrency in Node.js is about *interleaving async operations*, not multithreading.

**Example use case:**

- Limiting API requests to avoid server overload.
- Batch-processing database queries efficiently.

**Key takeaway:**

Node.js achieves concurrency through asynchronous scheduling inside a single thread.
This demo shows how to manage that concurrency manually by balancing performance and control.

---

## ⚙️ 2. `demo-nexttick-freeze.js`

**Concept:** The special behavior of `process.nextTick()` and how it can block the event loop.

**What it shows:**

- `process.nextTick()` callbacks run **before** any other microtasks or phases.
- When `process.nextTick()` recursively calls itself, the event loop **never moves forward** to other phases (e.g., timers, I/O).
- Demonstrates how infinite or deep recursion inside the Next Tick Queue can **freeze** the entire process.

**Example use case:**

- Internal libraries use `nextTick()` for small scheduling tweaks — but recursive use is dangerous.

**Key takeaway:**
Use `process.nextTick()` sparingly.
It runs before Promises and can block the loop if misused.

---

## ⚙️ 3. `demo-promise-loop.js`

**Concept:** Recursive Promises with event loop yielding.

**Focus:**

- Demonstrates how Promises can yield control back to the event loop between iterations.
- Shows the difference between microtasks that block the loop and those that allow other tasks to run.

**Queue / Phase:** Microtask Queue (Promises), Macrotask Queue (setTimeout for yielding)

**What it shows:**
- Each iteration is scheduled as a Promise, then the next iteration is deferred using `setTimeout(..., 0)`.
- This allows the event loop to continue executing other code (like `console.log('end')`) before finishing all iterations.
- You can see that the loop no longer “blocks” the event loop, unlike a recursive `process.nextTick()`.

**Real-world analogy:**
- Safe async recursion: long-running repeated tasks that don’t freeze the application.
- Useful for handling repeated async operations while still allowing timers, I/O, and other macrotasks to execute.

---

## ⚙️ 4. `demo-setImmediate-vs-timeout-io.js`

**Concept:** Execution order of `setImmediate()` vs `setTimeout()` inside I/O callbacks.

**What it shows:**

- Inside an I/O phase (e.g., `fs.readFile()` callback), `setImmediate()` executes **before** `setTimeout(fn, 0)`.
- Demonstrates microtask timing with an inline Promise (`Promise.resolve()`).
- Shows the real order:
`promise inside IO` → `setImmediate` → `timeout 0`.

**Example use case:**

- Understanding this order helps when scheduling async cleanup or non-blocking follow-up logic after I/O operations.

**Key takeaway:**
In I/O callbacks, the event loop moves from the **Poll** phase directly to the **Check** phase, so `setImmediate()` runs before timers like `setTimeout()`.

---

## ⚙️ 5. `demo-threadpool-pbkdf2.js`

**Concept:** True parallelism through the **libuv thread pool** for CPU-heavy async work.

**What it shows:**

- `crypto.pbkdf2()` runs in background worker threads provided by libuv.
- Multiple **PBKDF2** tasks execute in parallel depending on `UV_THREADPOOL_SIZE`.
- Logs per-task duration and total elapsed time.

**Example use case:**

- Hashing passwords, file compression, or image processing without blocking the main thread.

**Key takeaway:**

This is real parallelism — multiple operations execute simultaneously on background threads, while the main event loop stays responsive.

---

## ⚙️ 6. `helper.sh`

**Purpose:** Small shell utility script for running all demos sequentially or comparing outputs.
You can extend it to run profiling tools like `clinic bubbleprof` or record visual traces from `nodeloops.com`.

---

## ✅ Summary

| Demo | Focus | Queue / Phase | Real-World Analogy |
|------|--------|---------------|--------------------|
| `demo-concurrency-pool.js` | Manual async concurrency | Macrotasks | Controlled API batching |
| `demo-nexttick-freeze.js` | `process.nextTick()` behavior | Next Tick Queue | Internal scheduling pitfalls |
| `demo-promise-loop.js` | Recursive Promises | Microtask Queue | Async-safe recursion |
| `demo-setImmediate-vs-timeout-io.js` | I/O timing differences | Poll → Check | Post-I/O scheduling |
| `demo-threadpool-pbkdf2.js` | Thread pool parallelism | Worker Threads | Crypto, compression tasks |