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

// let max = 0;
// (function recur(arr, left = 2, right = 3, sum = 0) {
//   if (arr[left] === undefined) {
//     max = Math.max(max, sum);
//     sums.push(sum);
//     return;
//   }

//   recur(arr, left * 2, left * 2 + 1, sum + arr[left]);
//   recur(arr, right * 2, right * 2 + 1, sum + arr[right]);
// })(arr);

// let curr = sums;
// let res = 0;
// while (curr.length !== 1) {
//   const next = [];
//   for (let i = 0; i < curr.length / 2; i++) {
//     const [first, second] = [curr[i * 2], curr[i * 2 + 1]];
//     res += Math.abs(first - second);
//     next.push(Math.max(first, second));
//   }
//   curr = next;
// }

// console.log(total + res);

// 약간 분할 정복이라고 생각했지만 동적 계획법에 더 가까움

// 재귀로 푸는 방법도 있음
// - 접근 방식은 위의 방법과 똑같음
// - 양쪽의 (서브 트리의 합 + 간선의 합)이 서로 같도록 더 큰 값에 맞춘다.
// - 부족한 값은 answer에 추가하고, 더 큰 값을 리턴해서 위의 층에서 같은 방식으로 활용한다.

let res = total;
function recur(arr, curr = 2) {
  // 리프이면 반환
  if (arr[curr] === undefined) {
    return 0;
  }
  // 왼쪽
  const leftTreeSum = recur(arr, curr * 2);
  // 오른쪽
  const rightTreeSum = recur(arr, (curr + 1) * 2);
  const leftEdge = arr[curr];
  const rightEdge = arr[curr + 1];

  res += Math.abs(leftTreeSum + leftEdge - (rightTreeSum + rightEdge));
  return Math.max(leftTreeSum + leftEdge, rightTreeSum + rightEdge);
}

recur(arr);
console.log(res);
