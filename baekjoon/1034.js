// 램프 : 브루트 포스, 애드 혹
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = input
  .shift()
  .split(" ")
  .map((v) => Number(v));
const k = Number(input.pop());
const lamps = input;
const count = {};
let answer = 0;

for (const raw of lamps) {
  if (count[raw]) {
    count[raw]++;
  } else {
    count[raw] = 1;
  }
}

for (const [key, value] of Object.entries(count)) {
  const str = key.split("").map((v) => Number(v));
  let count = 0;
  for (const elem of str) {
    if (elem === 0) {
      count++;
    }
  }
  if (k === count) {
    answer = Math.max(answer, value);
  } else if (k < count) {
  } else if (k > count) {
    if ((k - count) % 2 === 0) {
      answer = Math.max(answer, value);
    }
  }
}

console.log(answer);
