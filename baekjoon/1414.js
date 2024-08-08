// 불우이웃돕기 : 최소 스패닝 트리
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = Number(input.shift());
const costs = input.map((v) => v.split(""));
const convert = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .split("")
  .reduce((acc, curr, i) => {
    acc[curr] = i;
    return acc;
  }, {});
const parents = new Array(n + 1).fill(0).map((v, i) => i);
let total = 0;
const q = [];

for (let i = 0; i < costs.length; i++) {
  const row = costs[i];
  for (let j = 0; j < row.length; j++) {
    const value = row[j];
    const convertedValue = convert[value];
    total += convertedValue;
    if (value !== "0") {
      q.push([[i + 1, j + 1], convertedValue]);
    }
  }
}

const sorted = q.sort((a, b) => a[1] - b[1]);

function getParent(x, parents) {
  if (parents[x] === x) {
    return x;
  }

  return (parents[x] = getParent(parents[x], parents));
}

function union(x, y, parents) {
  x = getParent(x, parents);
  y = getParent(y, parents);

  if (x > y) {
    parents[x] = y;
  } else {
    parents[y] = x;
  }
}

function isSameParent(x, y, parents) {
  x = getParent(x, parents);
  y = getParent(y, parents);

  return x === y;
}

let idx = 0;
let answer = 0;

while (idx < sorted.length) {
  const [[x, y], value] = sorted[idx++];
  if (!isSameParent(x, y, parents)) {
    union(x, y, parents);
    answer += value;
  }
}

// 저번에도 틀렸던 부분인데...
// - 결과적으로 MST가 완성이 되었어도 반드시 하나의 값으로 모두 채워지는 것은 아니다
let flag = false;
for (let i = 1; i < parents.length; i++) {
  if (!isSameParent(1, i, parents)) {
    flag = true;
    break;
  }
}

console.log(flag ? -1 : total - answer);

// MST의 성질 : 분리 집합의 판별
// - getParents에서 경로 압축을 한다고 해서 MST가 완성이 되었을 때, 반드시 하나의 값으로 모두 채워지는 것은 아니다
// - 예를 들어, parents 배열이 [0, 1, 1, 2]가 되는 경우도 있다
// - 분리 집합이 2개 이상있는 것을 확인하기 위해서는 "parents 배열의 값이 같은지?"가 아니라 "루트의 값이 같은지?"를 확인해야 한다
