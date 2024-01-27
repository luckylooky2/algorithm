// 탑 : 스택
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = Number(input[0]);
const heights = input[1].split(" ").map((v) => Number(v));
const stack = [];
const answer = [];

for (let i = 0; i < n; i++) {
  const curr = heights[i];
  const index = i + 1;
  // 현재보다 작은 값은 stack에서 더 이상 확인할 필요가 없음
  // 다음 차례에 현재가 더 우세하기 때문
  while (stack.length && stack[stack.length - 1][0] < curr) {
    stack.pop();
  }
  if (!stack.length) {
    answer.push(0);
  } else {
    answer.push(stack[stack.length - 1][1]);
  }
  stack.push([curr, index]);
}

console.log(answer.join(" "));
