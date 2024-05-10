// 이진 검색 트리 : 그래프 탐색, 재귀 호출
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const arr = input.map((v) => Number(v));
let answer = [];

function recur(arr) {
  if (arr.length <= 1) {
    if (arr.length) {
      answer.push(arr[0]);
    }
    return;
  }

  let root, left, right;
  root = [arr[0]];
  right = [];
  left = arr.slice(1);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > root[0]) {
      right = arr.slice(i);
      left = arr.slice(1, i);
      break;
    }
  }
  recur(left);
  recur(right);
  recur(root);
}

recur(arr);

console.log(answer.length ? answer.join("\n") : arr[0]);
