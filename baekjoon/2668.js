// 숫자고르기 : 그래프, 깊이 우선 탐색, 분리 집합
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => +v);
const n = input.shift();
const arr = input.map((v, i) => [i + 1, v]);
const parent = new Array(n + 1).fill(0).map((_v, i) => i);
input.unshift(0);

function getParent(x) {
  if (x === parent[x]) {
    return x;
  }

  return (parent[x] = getParent(parent[x]));
}

function find(x, y) {
  return getParent(x) === getParent(y);
}

function union(x, y) {
  x = getParent(x);
  y = getParent(y);

  if (x > y) {
    parent[x] = y;
  } else {
    parent[y] = x;
  }
}

const loop = [];

function checkLoop(arr, start) {
  const visit = new Array(arr.length).fill(false);
  let curr = start;
  visit[curr] = true;
  let result = [curr];

  while (true) {
    curr = arr[curr];
    if (!visit[curr]) {
      result.push(curr);
      visit[curr] = true;
    } else {
      break;
    }
  }
  return result;
}

for (const [n1, n2] of arr) {
  if (find(n1, n2)) {
    if (n1 === n2) {
      loop.push(n1);
    } else {
      // 최신화
      const result = checkLoop(input, n1);
      loop.push(...result);
    }
  } else {
    union(n1, n2);
  }
}

console.log(loop.length);
console.log(loop.sort((a, b) => a - b).join("\n"));

// 사이클 찾는 문제
// - 방법?
// - 1. 분리 집합
// - 2. dfs => 어떻게?

// 발견된 모든 루프 중 가장 긴 것을 찾는 것이 아니라 모두 합쳤어야 함
