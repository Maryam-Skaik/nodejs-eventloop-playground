#!/bin/bash
# Simple helper script to run all async demos

echo "Running demo-concurrency-pool.js..."
node demo-concurrency-pool.js 4
echo "----------------------------------"

echo "Running demo-nexttick-freeze.js..."
node demo-nexttick-freeze.js
echo "----------------------------------"

echo "Running demo-promise-loop.js..."
node demo-promise-loop.js
echo "----------------------------------"

echo "Running demo-setImmediate-vs-timeout-io.js..."
node demo-setImmediate-vs-timeout-io.js
echo "----------------------------------"

echo "Running demo-threadpool-pbkdf2.js..."
node demo-threadpool-pbkdf2.js 6
echo "----------------------------------"

echo "✅ All demos executed."
