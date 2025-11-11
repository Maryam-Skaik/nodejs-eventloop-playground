# 🧠 Node.js Event Loop Playground

![Node.js](https://img.shields.io/badge/Node.js-14+-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Clinic.js](https://img.shields.io/badge/Profiler-Clinic.js-orange)
![Education](https://img.shields.io/badge/Purpose-Learning-lightgrey)

> A comprehensive, visual, and practical guide to understanding how Node.js handles asynchronous operations — including **microtasks**, **macrotasks**, the **libuv thread pool**, and performance profiling using **Clinic.js** and **NodeLoops Visualizer**.

---

## 📘 Overview

This repository collects **real runnable demos**, **visualizations**, and **performance traces** that explain how the Node.js Event Loop executes:
- **Synchronous code**
- **Microtasks** (`process.nextTick`, `Promise`)
- **Macrotasks** (`setTimeout`, `setImmediate`, I/O callbacks)
- **libuv Thread Pool** for CPU-bound operations

The project also integrates:
- 🌀 **NodeLoops Visualizer** → to see the internal scheduling visually  
- 🔥 **Clinic.js** → to analyze performance, bottlenecks, and event loop delay

---

## 🧩 Repository Structure

```bash
nodejs-eventloop-playground/
├─ codes/
│ ├─ demo-concurrency-pool.js
│ ├─ demo-nexttick-freeze.js
│ ├─ demo-promise-loop.js
│ ├─ demo-setImmediate-vs-timeout-io.js
│ ├─ demo-threadpool-pbkdf2.js
│ └─ 00-readme.md
├─ clinic-screenshots/
│ ├─ demo-concurrency-pool 01.png
│ ├─ demo-concurrency-pool 02.png
│ ├─ demo-threadpool-pbkdf2 01.png
│ └─ demo-threadpool-pbkdf2 02.png
├─ videos/
│ ├─ demo-nexttick-freeze.mp4
│ └─ demo-promise-loop.mp4
├─ README.md
├─ package.json
├─ .gitignore
└─ LICENSE
```

Each folder is self-contained and designed for both **learning** and **profiling real-world behavior**.

---

## ⚙️ Installation

```bash
git clone https://github.com/Maryam-Skaik/nodejs-eventloop-playground.git
cd nodejs-eventloop-playground
npm install
```

> Requires Node.js 14+

---

## 🧪 Demos Overview

| Demo                             | Focus                         | Queue / Phase           | Real-World Analogy                      |
|----------------------------------|--------------------------------|--------------------------|-----------------------------------------|
| `demo-concurrency-pool.js`       | Manual async concurrency       | Macrotasks               | Controlled API batching                 |
| `demo-nexttick-freeze.js`        | `process.nextTick()` behavior  | Next Tick Queue          | Internal scheduling pitfalls            |
| `demo-promise-loop.js`           | Yielding Promises              | Microtask → Macrotask    | Async-safe recursion without blocking the event loop |
| `demo-setImmediate-vs-timeout-io.js` | I/O timing differences      | Poll → Check             | Post-I/O scheduling                     |
| `demo-threadpool-pbkdf2.js`      | Thread pool parallelism        | Worker Threads           | Crypto or compression tasks             |


---

## ▶️ Running the Demos

```bash
# Run all demos
./codes/helper.sh

# Run a single demo
node codes/demo-concurrency-pool.js
```

> The helper script executes all demos sequentially and prints timing information for each.

---

## 🖼️ Visualizations

**NodeLoops Visualizer**

- Shows how tasks enter the call stack, then microtasks (`nextTick` + Promises) and finally macrotasks.
- You can step through the event loop to see task ordering visually.

**Clinic.js**

- Analyzes performance of each async task:
    - Line length represents execution + waiting time
    - Bubble size indicates heavy vs light tasks
    - Tasks running concurrently appear on the same line

---

## 📚 Key Learning Points

- Node.js executes **Sync** → **Microtasks** → **Macrotasks** in that order.
- `process.nextTick()` runs before Promises in the same tick.
- Promises in a loop can be scheduled to yield back to the event loop using macrotasks (e.g., `setTimeout(…,0)`).
- I/O operations interact with **Poll** → **Check phases**, and `setImmediate()` often executes before `setTimeout()` post-I/O.
- The **libuv Thread Pool** allows parallel execution for CPU-heavy tasks (`crypto.pbkdf2`, file compression).
- **Clinic.js** and **NodeLoops** help visualize timing, concurrency, and bottlenecks in real code.

---

## 📖 Detailed Demo Explanations

For more in-depth explanations of each demo and their behaviors, see [codes/00-readme.md](codes/00-readme.md).

---

## 🎥 Media

- Videos showing NodeLoops execution:
    - [videos/demo-nexttick-freeze.mp4](videos/demo-nexttick-freeze.mp4)
    - [videos/demo-promise-loop.mp4](videos/demo-promise-loop.mp4)

---

## 📌 Notes

- This repo is intended for **learning, experimentation, and profiling** real Node.js async behavior.
- You can reuse the demos in your own projects to understand microtask/macrotask scheduling and libuv thread pool usage.

---

## 📜 License

This project is licensed under the MIT License

---

## 🧾 Credits

Created by [**Maryam Skaik**](https://github.com/Maryam-Skaik)

> “Understanding the event loop is understanding Node.js itself.”
