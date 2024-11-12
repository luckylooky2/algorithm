// 주사위 : 수학, 그리디
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const n = +input.shift();
const arr = input
  .shift()
  .split(" ")
  .map((v) => +v);
let answer = 0n;
const minSum = new Array(4).fill(Infinity);
const count = new Array(4).fill(0);
const countSum = new Array(4).fill(0);
minSum[0] = 0;

// 모든 각각의 원소들의 합이 5가 아니라면, 맞닿아 있다는 것이다.
// - 3개 이상일 때는 모든 원소에 대해 확인해야 한다.
function check(visit) {
  for (let i = 0; i < visit.length - 1; i++) {
    for (let j = i + 1; j < visit.length; j++) {
      if (visit[i] + visit[j] === 5) {
        return false;
      }
    }
  }
  return true;
}

function dfs(arr, maxDepth, curr = -1, visit = []) {
  if (visit.length === maxDepth) {
    if (check(visit)) {
      const items = visit.map((v) => arr[v]);
      minSum[maxDepth] = Math.min(
        minSum[maxDepth],
        items.reduce((acc, curr) => acc + curr)
      );
    }
    return;
  }

  for (let i = curr + 1; i < 6; i++) {
    visit.push(i);
    dfs(arr, maxDepth, i, visit);
    visit.pop();
  }
}

for (let i = 1; i <= 3; i++) {
  dfs(arr, i);
}

if (n === 1) {
  answer = BigInt(arr.reduce((acc, curr) => acc + curr) - Math.max(...arr));
} else {
  const [total, line, vertex] = [n * n, (n - 1) * 4, 4];
  count[2] = vertex;
  count[1] = line - vertex;
  count[0] = total - line;
  for (let i = 0; i < 3; i++) {
    countSum[i] += count[i] * (n - 1);
    countSum[i + 1] += count[i];
  }
  for (let i = 0; i < countSum.length; i++) {
    answer += BigInt(countSum[i] * minSum[i]);
  }
}

console.log(String(answer));
