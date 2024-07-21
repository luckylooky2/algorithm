// 낮잠 시간
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, b] = input
  .shift()
  .split(" ")
  .map((v) => Number(v));
const recovery = input.map((v) => Number(v));

function recur(sorted, count, values = [], depth = 0) {
  if (depth === sorted.length) {
    if (values.reduce((acc, prev) => acc + prev, 0) !== b) {
      return;
    } else {
      let total = 0;
      for (let i = 0; i < values.length; i++) {
        total += recovery
          .slice(sorted[i][0], sorted[i][0] + values[i])
          .reduce((acc, prev) => acc + prev, 0);
      }
      max = Math.max(max, total);
    }
    return;
  }

  const elem = sorted[depth];
  for (let j = count[depth]; j <= elem[1]; j++) {
    values.push(j);
    recur(sorted, count, values, depth + 1);
    values.pop();
  }
}

// 1
let first = 1,
  second = b;
let total = recovery.slice(first, second).reduce((acc, prev) => acc + prev);
let max = total;
while (second < n) {
  total -= recovery[first++];
  total += recovery[second++];
  max = Math.max(max, total);
}

// 2
const start = [];
for (let i = 0; i < n; i++) {
  if (recovery[i] === 0) {
    start.push(i);
  }
}
const span = [];
for (let i = 1; i <= start.length; i++) {
  const last = i === start.length ? n : start[i];
  span.push([start[i - 1], last - start[i - 1]]);
}
const sorted = span.filter((v) => v[1] !== 1);
const count = span.slice().fill(2);
recur(sorted, count);
console.log(max);

// https://www.acmicpc.net/problem/1988
