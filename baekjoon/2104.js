// 부분 배열 고르기 : 분할 정복, 세그먼트 트리
const fs = require("fs");

const [input, arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const n = input[0];
const sumTree = [undefined];
const indexTree = [undefined];
let final = -Infinity;

function segSumTree(start, end, node = 1) {
  if (start === end) return (sumTree[node] = arr[start]);

  const mid = Math.floor((start + end) / 2);
  const lValue = segSumTree(start, mid, 2 * node);
  const rValue = segSumTree(mid + 1, end, 2 * node + 1);
  return (sumTree[node] = lValue + rValue);
}

function segIndexTree(start, end, node = 1) {
  if (start === end) return (indexTree[node] = start);

  const mid = Math.floor((start + end) / 2);
  const lIndex = segIndexTree(start, mid, 2 * node);
  const rIndex = segIndexTree(mid + 1, end, 2 * node + 1);
  return (indexTree[node] = arr[lIndex] > arr[rIndex] ? rIndex : lIndex);
}

function querySum(start, end, currLeft, currRight, node = 1) {
  if (start > currRight || end < currLeft) return Infinity;
  if (start <= currLeft && currRight <= end) return sumTree[node];

  const mid = Math.floor((currLeft + currRight) / 2);
  const lValue = querySum(start, end, currLeft, mid, 2 * node);
  const rValue = querySum(start, end, mid + 1, currRight, 2 * node + 1);
  if (lValue === Infinity) return rValue;
  else if (rValue === Infinity) return lValue;
  else return lValue + rValue;
}

function queryIndex(start, end, currLeft, currRight, node = 1) {
  if (start > currRight || end < currLeft) return Infinity;
  if (start <= currLeft && currRight <= end) return indexTree[node];

  const mid = Math.floor((currLeft + currRight) / 2);
  const lIndex = queryIndex(start, end, currLeft, mid, 2 * node);
  const rIndex = queryIndex(start, end, mid + 1, currRight, 2 * node + 1);
  if (lIndex === Infinity) return rIndex;
  else if (rIndex === Infinity) return lIndex;
  else return arr[lIndex] > arr[rIndex] ? rIndex : lIndex;
}

segSumTree(0, n - 1);
segIndexTree(0, n - 1);

function recur(start, end) {
  if (start > end) return;
  const index = queryIndex(start, end, 0, n - 1);
  const sum = querySum(start, end, 0, n - 1);
  const value = sum * arr[index];
  if (value > final) final = value;
  recur(start, index - 1);
  recur(index + 1, end);
}

recur(0, n - 1);

console.log(final);
