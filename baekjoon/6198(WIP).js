// 옥상 정원 꾸미기
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => Number(v));
const n = input.shift();
const heights = input;
const answer = input.map(() => 0);

let stack = heights.map((v) => v);
let startIndex = n - 1;

while (true) {
  const curr = stack.pop();
  if (stack.length === 0) break;
  const top = stack[stack.length - 1];
  if (top > curr) {
    // 바로 이전 + 가장 컸던 숫자 + 그 사이의 개수
    answer[stack.length - 1] =
      1 +
      (top > heights[startIndex]
        ? answer[startIndex] + startIndex - stack.length
        : startIndex === n - 1
        ? 0
        : startIndex - stack.length - 1);
    // 최신화
    startIndex = stack.length - 1;
  }
}

console.log(answer.reduce((a, b) => a + b));

// let st = [input[n - 1]];

// let big = input[n - 1];
// input[0] = 0;

// for (let i = n - 1; i > 0; i--) {
//   const curr = heights[i];
//   if (curr >= big || i === 1) {
//     st.push(curr);
//     big = curr;
//     answer[i] = st.length - 1;
//     // while
//     st = [];
//     continue;
//   }
//   st.push(curr);

//   console.log(st);
// }

// console.log(answer);
