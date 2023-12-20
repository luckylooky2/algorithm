// 최소 스패닝 트리 : 최소 스패닝 트리
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, m] = input.shift();
const parentArr = new Array(n + 1).fill(0).map((_v, i) => i);
const answer = [];

// union find
function getParent(parentArr, x) {
  if (parentArr[x] === x) return x;
  // return 누락 주의
  else return getParent(parentArr, parentArr[x]);
}

function union(parentArr, a, b) {
  a = getParent(parentArr, a);
  b = getParent(parentArr, b);

  if (a > b) parentArr[a] = b;
  else parentArr[b] = a;
}

function find(parentArr, a, b) {
  a = getParent(parentArr, a);
  b = getParent(parentArr, b);
  return a === b;
}

// Kruskal ver.
// 1. 간선을 크기의 오름차순으로 정렬
const sorted = input.sort((a, b) => a[2] - b[2]);

// 2. 제일 비용이 낮은 간선부터 선택
for (let node of sorted) {
  // 3. 같은 그래프에 있는지 확인
  if (!find(parentArr, node[0], node[1])) {
    // 3-1. 같은 그래프가 아니라면, 그래프에 추가(union)
    union(parentArr, node[0], node[1]);
    answer.push(node[2]);
  }
  // 3-2. 같은 그래프라면 스킵
}

console.log(answer.reduce((prev, curr) => prev + curr));
