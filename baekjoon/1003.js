// 피보나치 함수 : 동적 계획법
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => parseInt(v, 10));

arr.shift();
const cache = { 0: 0, 1: 1 };
let i = 2;

arr.forEach((element) => {
  while (i <= element) {
    cache[i] = cache[i - 1] + cache[i - 2];
    i++;
  }
  console.log(element ? cache[element - 1] : 1, cache[element]);
});
