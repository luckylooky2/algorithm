// 오아시스 재결합
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => Number(v));
const n = input.shift();
let stack = [];
let answer = 0;

// w/o stack
for (let i = 1; i < n; i++) {
  const curr = input[i];
  const prev = input[i - 1];
  if (curr < prev) {
    answer += 1;
  } else {
    let count = 0;
    let max = 0;
    for (let j = i - 1; j >= 0; j--) {
      if (curr >= input[j]) {
        if (input[j] < max) continue;
        count++;
        max = Math.max(max, input[j]);
      } else {
        count++;
        break;
      }
    }
    answer += count;
  }
}

console.log(answer);

// [2, 4, 1, 2, 2, 5, 1]
