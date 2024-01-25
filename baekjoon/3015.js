// 오아시스 재결합 : 스택
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => Number(v));
const n = input.shift();
// 2. 시간 초과 해결 : 중복 개수를 처리하기 위한 묶기
let stack = [[input[0], 1]];
let answer = 0;

// w/ stack
for (let i = 1; i < n; i++) {
  const curr = input[i];
  // curr보다 큰 것이 나올 때까지 개수 세기
  let count = 0;
  for (let j = stack.length - 1; j >= 0; j--) {
    if (curr < stack[j][0]) {
      count++;
      break;
    } else {
      count += stack[j][1];
    }
  }
  answer += count;
  // curr보다 작은 원소 pop
  // 1. 시간 초과 해결 : 더 이상 필요 없는 원소 pop
  while (stack.length && stack[stack.length - 1][0] < curr) {
    stack.pop();
  }
  if (stack.length && stack[stack.length - 1][0] === curr) {
    stack[stack.length - 1][1]++;
  } else {
    stack.push([curr, 1]);
  }
}

console.log(answer);

// w/o stack : 시간 초과
// for (let i = 1; i < n; i++) {
//   const curr = input[i];
//   const prev = input[i - 1];
//   if (curr < prev) {
//     answer += 1;
//   } else {
//     let count = 0;
//     let max = 0;
//     for (let j = i - 1; j >= 0; j--) {
//       if (curr >= input[j]) {
//         if (input[j] < max) continue;
//         count++;
//         max = Math.max(max, input[j]);
//       } else {
//         count++;
//         break;
//       }
//     }
//     answer += count;
//   }
// }

// console.log(answer);

// [2, 4, 1, 2, 2, 5, 1]
// [10, 9, 1, 3, 8, 6, 7, 8, 5, 8]
