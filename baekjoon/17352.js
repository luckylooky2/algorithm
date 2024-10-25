// 여러분의 다리가 되어 드리겠습니다! : 분리 집합, 그래프
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const bridges = input;
const parent = new Array(n + 1).fill(null).map((_v, i) => i);
const answer = [];

function getParent(x) {
  if (x === parent[x]) {
    return x;
  }
  return (parent[x] = getParent(parent[x]));
}

function union(x, y) {
  x = getParent(x);
  y = getParent(y);

  if (x < y) {
    parent[y] = x;
  } else {
    parent[x] = y;
  }
}

for ([s, e] of bridges) {
  union(s, e);
}

// 인덱스와 값이 같으면, 분리 집합의 기준이 되는 값이다.
for (let i = 1; i <= n; i++) {
  if (parent[i] === i) {
    answer.push(i);
  }
}

console.log(answer.join(" "));
