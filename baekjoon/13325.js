// 이진 트리 : 트리, 동적 계획법, 트리에서의 동적 계획법
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
let idx = 0;
const [n] = input[idx++];
const arr = input[idx++];
const total = arr.reduce((acc, curr) => acc + curr, 0);
arr.unshift(null);
arr.unshift(null);
const sums = [];

let max = 0;
(function recur(arr, left = 2, right = 3, sum = 0) {
  if (arr[left] === undefined) {
    max = Math.max(max, sum);
    sums.push(sum);
    return;
  }

  recur(arr, left * 2, left * 2 + 1, sum + arr[left]);
  recur(arr, right * 2, right * 2 + 1, sum + arr[right]);
})(arr);

let curr = sums;
let res = 0;
while (curr.length !== 1) {
  const next = [];
  for (let i = 0; i < curr.length / 2; i++) {
    const [first, second] = [curr[i * 2], curr[i * 2 + 1]];
    res += Math.abs(first - second);
    next.push(Math.max(first, second));
  }
  curr = next;
}

console.log(total + res);

// 약간 분할 정복이라고 생각했지만 동적 계획법에 더 가까움

// 재귀로 푸는 방법도 있음
// - 양쪽의 서브 트리의 누적 합과 간선의 합이 서로 같도록
