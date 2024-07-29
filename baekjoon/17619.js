// 개구리 점프 : 정렬, 스위핑, 분리 집합
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, q] = input[0];
const logs = input.slice(1, 1 + n);
const queries = input.slice(1 + n);
const sorted = logs.map((v, i) => [...v, i + 1]).sort((a, b) => a[0] - b[0]);
// union find?
const parent = new Array(n + 1).fill(0).map((v, i) => i);
let [start, end] = [0, 0];
let curr = 0;
let answer = [];

for (let i = 0; i < sorted.length; i++) {
  const [s, e, y, number] = sorted[i];
  if (start === 0 && end === 0) {
    start = s;
    end = e;
    curr = number;
  } else {
    // 일단 높이 고려 x
    if (s > end) {
      start = s;
      end = e;
      curr = number;
    } else {
      start = Math.min(start, s);
      end = Math.max(end, e);
    }
    parent[number] = curr;
  }
}

for (const [log1, log2] of queries) {
  if (parent[log1] === parent[log2]) {
    answer.push(1);
  } else {
    answer.push(0);
  }
}

console.log(answer.join("\n"));
