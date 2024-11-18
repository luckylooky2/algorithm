// 계란으로 계란치기 : 브루트 포스, 백트래킹
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const hp = [];
const weight = [];
let answer = 0;

for (let i = 0; i < n; i++) {
  hp.push(input[i][0]);
  weight.push(input[i][1]);
}

function solve(visit) {
  const copy = hp.slice();
  for (let i = 0; i < n; i++) {
    const one = visit[i];
    const two = i;
    if (copy[one] <= 0 || copy[two] <= 0) {
      continue;
    }
    copy[one] -= weight[two];
    copy[two] -= weight[one];
  }

  let count = 0;
  for (let i = 0; i < n; i++) {
    if (copy[i] <= 0) {
      count++;
    }
  }
  return count;
}

function dfs(arr, visit = []) {
  if (visit.length === n) {
    answer = Math.max(answer, solve(visit));
    return;
  }

  for (let i = 0; i < n; i++) {
    if (i === visit.length) {
      continue;
    }

    visit.push(i);
    dfs(arr, visit);
    visit.pop();
  }
}

dfs(hp);

console.log(answer);
