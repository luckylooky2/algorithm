// 소수 찾기 : 수학
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const n = input.shift();
const arr = input.shift();
let answer = 0;

arr.map((v) => {
  let flag = false;
  for (let i = 2; i * i <= v; i++) {
    if (v % i === 0) {
      flag = true;
      break;
    }
  }
  if (v !== 1 && !flag) answer++;
});

console.log(answer);
