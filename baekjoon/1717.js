// 집합의 표현 : 분리 집합
const input = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, operationCount] = input.shift();
const operation = input;
const answer = [];
const [OP_INTEGRATE, OP_CHECK] = [0, 1];
const parents = new Array(n + 1).fill(0).map((_v, i) => i);

function getParents(x) {
  if (parents[x] === x) {
    return x;
  }

  return (parents[x] = getParents(parents[x]));
}

function union(x, y) {
  x = getParents(x);
  y = getParents(y);

  if (x > y) {
    parents[x] = y;
  } else {
    parents[y] = x;
  }
}

function isSameParent(x, y) {
  return getParents(x) === getParents(y);
}

for (const [op, a, b] of operation) {
  if (op === OP_CHECK) {
    answer.push(isSameParent(a, b) ? "YES" : "NO");
  }
  if (op === OP_INTEGRATE) {
    union(a, b);
  }
}

console.log(answer.join("\n"));

// 0, 1, 2, 3, 4, 5, 6, 7
// {1, 3}, 2, 4, 5, 6, 7
// {1, 3}, 2, 4, 5, {6, 7}
// {1, 3, 6, 7}, 2, 4, 5
// {1, 3, 6, 7}, {2, 4}, 5

// require("fs").readFileSync("/dev/stdin") 대신 require("fs").readFileSync(0, "utf-8")를 사용해야 권한 문제가 발생하지 않음
