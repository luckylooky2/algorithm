// 개구리 점프 : 정렬, 스위핑, 분리 집합
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, q] = input[0];
const logs = input.slice(1, 1 + n);
const queries = input.slice(1 + n);
const sorted = logs.map((v, i) => [...v, i]).sort((a, b) => a[0] - b[0]);
// union find?
const parent = new Array(n).fill(0).map((v, i) => i);
let [start, end] = [0, 0];
let curr = 0;
let answer = [];

function union(a, b) {
  a = getParent(parent[a]);
  b = getParent(parent[b]);

  if (a > b) {
    parent[a] = b;
  } else {
    parent[b] = a;
  }
}

function getParent(x) {
  if (parent[x] === x) {
    return x;
  }

  return (parent[x] = getParent(parent[x]));
}

function find(a, b) {
  a = getParent(parent[a]);
  b = getParent(parent[b]);

  return a === b;
}

for (let i = 0; i < sorted.length; i++) {
  const [s, e, y, number] = sorted[i];
  if (start === 0 && end === 0) {
    start = s;
    end = e;
    curr = number;
  } else {
    // 일단 높이 고려 x
    if (s > end) {
      start = s;
      end = e;
      curr = number;
    } else {
      union(number, curr);
      if (end < e) {
        end = e;
        curr = number;
      }
    }
  }
}

// cf> union이 한 번만 호출되면 두 값이 일치하지 않을 수 있다
for (const [log1, log2] of queries) {
  if (find(parent[log1 - 1], parent[log2 - 1])) {
    answer.push(1);
  } else {
    answer.push(0);
  }
}

console.log(answer.join("\n"));
