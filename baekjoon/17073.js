// 나무 위의 빗물 : 트리, 그래프 탐색, 수학
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n, w] = input.shift();
const edges = input;
const adjacent = new Array(n + 1).fill(null).map(() => new Array(0));
let leafCount = 0;

for (const [start, end] of edges) {
  adjacent[start].push(end);
  adjacent[end].push(start);
}

for (let i = 2; i <= n; i++) {
  if (adjacent[i].length === 1) {
    leafCount++;
  }
}

console.log(Number(w / leafCount).toFixed(5));

// 모든 리프 노드에 도달하는 물의 총량은 항상 w으로 동일하다.
