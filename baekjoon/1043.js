// 거짓말 : 분리 집합
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n, m] = input.shift();
const truth = input.shift();
const truthNum = truth.shift();
const parties = input;
const parent = new Array(n + 1).fill(0).map((_v, i) => i);
let answer = parties.length;

let first = null;
for (const person of truth) {
  if (first === null) {
    first = person;
  }
  parent[person] = first;
}

function getParents(x) {
  if (parent[x] === x) {
    return x;
  }

  return (parent[x] = getParents(parent[x]));
}

function union(x, y) {
  x = getParents(x);
  y = getParents(y);

  if (x > y) {
    parent[x] = y;
  } else {
    parent[y] = x;
  }
}

function find(x, y) {
  x = getParents(x);
  y = getParents(y);

  return x === y;
}

for (const party of parties) {
  party.shift();
  for (let i = 0; i < party.length - 1; i++) {
    union(party[i], party[i + 1]);
  }
}

for (const party of parties) {
  let flag = false;
  for (const person of party) {
    if (first !== null) {
      if (find(first, person)) {
        flag = true;
        break;
      }
    }
  }
  if (flag) {
    answer--;
  }
}

console.log(answer);
