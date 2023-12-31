const { get } = require("http");

// 행성 터널
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const withIndex = input.map((v, i) => [...v, i]);
const sortedX = withIndex.map((v) => v).sort((a, b) => a[0] - b[0]);
const sortedY = withIndex.map((v) => v).sort((a, b) => a[1] - b[1]);
const sortedZ = withIndex.map((v) => v).sort((a, b) => a[2] - b[2]);

const parentArr = new Array(n + 1).map((_v, i) => i);

function getParent(a, parentArr) {
  if (parentArr[a] === a) return a;
  else return getParent(parentArr[a], parentArr);
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

let a = 0,
  b = 0,
  c = 0;

while (!(a === n && b === n && c === n)) {}

console.log(sortedX, sortedY, sortedZ);
