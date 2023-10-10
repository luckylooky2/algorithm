// 부분수열의 합 : 백트래킹, 브루트 포스
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, s] = input.shift();
const arr = input.shift();
const visited = [];
let answer = 0;
let total = 0;

function isIncluded(num) {
  for (let i = 0; i < visited.length; i++) if (visited[i] === num) return true;
  return false;
}

function recur(depth = 0) {
  if (total === s && depth > 0) answer++;
  if (depth === n) return;

  for (let i = 0; i < n; i++) {
    if (isIncluded(i) || visited[visited.length - 1] >= i) continue;
    visited.push(i);
    total += arr[i];
    recur(depth + 1);
    visited.pop();
    total -= arr[i];
  }
}

recur();

console.log(answer);
