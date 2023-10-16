// 수 정렬하기 2 : 정렬

const mergeSort = require("./mergeSort");
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => parseInt(v, 10));
const n = arr.shift();

console.log(mergeSort(0, n - 1, arr).join("\n"));
