// 캠프 준비 : 브루트 포스, 백트래킹, 비트마스킹
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n, l, r, x] = input.shift();
const difficulty = input.shift().sort((a, b) => a - b);
let answer = 0;

function dfs(arr, curr = -1, visit = [], sum = 0) {
  if (visit.length === n) {
    if (
      sum >= l &&
      sum <= r &&
      arr[visit[visit.length - 1]] - arr[visit[0]] >= x
    ) {
      answer++;
    }
    return;
  }

  if (sum > r) {
    return;
  }

  if (
    visit.length >= 2 &&
    sum >= l &&
    arr[visit[visit.length - 1]] - arr[visit[0]] >= x
  ) {
    answer++;
  }

  for (let i = curr + 1; i < arr.length; i++) {
    if (visit.includes(i)) {
      continue;
    }
    visit.push(i);
    dfs(arr, i, visit, sum + arr[i]);
    visit.pop();
  }
}

dfs(difficulty);

console.log(answer);
