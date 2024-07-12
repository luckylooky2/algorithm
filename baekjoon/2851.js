// 슈퍼 마리오 : 누적 합, 브루트 포스
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => Number(v));
const mushrooms = input;
const prefixSum = new Array(mushrooms.length + 1).fill(0);
let TARGET = 100;
let answer = 0;

for (let i = 1; i <= mushrooms.length; i++) {
  const mushroom = mushrooms[i - 1];

  prefixSum[i] = prefixSum[i - 1] + mushroom;
  const curr = prefixSum[i];
  if (curr === TARGET) {
    answer = TARGET;
    break;
  } else if (Math.abs(curr - TARGET) <= Math.abs(answer - TARGET)) {
    answer = Math.max(answer, curr);
  }
}

console.log(answer);
