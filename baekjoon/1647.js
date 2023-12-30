// 도시 분할 계획 : 그래프, 최소 스패닝 트리
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, m] = input.shift();
const edges = input;
const parentArr = new Array(n + 1).fill(null).map((_v, i) => i);
let answer = 0;
let cnt = n;

function getParent(x, parentArr) {
  if (parentArr[x] === x) return x;
  else return getParent(parentArr[x], parentArr);
}

function union(a, b, parentArr) {
  a = getParent(a, parentArr);
  b = getParent(b, parentArr);

  if (a > b) parentArr[a] = b;
  else parentArr[b] = a;
}

function find(a, b, parentArr) {
  a = getParent(a, parentArr);
  b = getParent(b, parentArr);
  return a === b;
}

const sorted = edges.sort((a, b) => a[2] - b[2]);

for (let [start, end, cost] of sorted) {
  if (cnt === 2) break;
  if (find(start, end, parentArr)) continue;
  union(start, end, parentArr);
  answer += cost;
  // parentArr[x] = x가 아닌 개수
  // 직접 parentArr에서 x가 아닌 개수를 세면 시간 초과
  cnt--;
}

console.log(answer);
