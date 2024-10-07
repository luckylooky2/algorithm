// 용액 합성하기 : 이분 탐색, 투 포인터
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
let idx = 0;
const [n] = input[idx++];
const solutions = input[idx++];
let answer = Infinity;
let min = Infinity;

// // 자신을 제외해야 하는데 어떻게? 주변 것을 확인하자
// function lowerBound(arr, target, start = 0, end = arr.length - 1) {
//   if (start === end) {
//     return start;
//   }
//   const mid = Math.floor((start + end) / 2);
//   if (arr[mid] < target) {
//     return lowerBound(arr, target, mid + 1, end);
//   } else {
//     return lowerBound(arr, target, start, mid);
//   }
// }

// function solve(s, solutions, index) {
//   const sum = s + solutions[index];
//   if (min > Math.abs(sum)) {
//     min = Math.abs(sum);
//     answer = sum;
//   }
// }

// for (let i = 0; i < solutions.length; i++) {
//   const s = solutions[i];
//   const index = lowerBound(solutions, -1 * s);

//   if (index !== 0) {
//     solve(s, solutions, index - 1);
//   }
//   if (index !== i) {
//     solve(s, solutions, index);
//   }
//   if (index !== solutions.length - 1) {
//     solve(s, solutions, index + 1);
//   }
// }

// console.log(answer);

// 투 포인터로 풀어보기
// - 배열 정렬 필요

let [s, e] = [0, solutions.length - 1];

while (s !== e) {
  const sum = solutions[s] + solutions[e];
  if (min > Math.abs(sum)) {
    min = Math.abs(sum);
    answer = sum;
  }
  if (sum > 0) {
    e--;
  } else if (sum < 0) {
    s++;
  } else {
    break;
  }
}

console.log(answer);
