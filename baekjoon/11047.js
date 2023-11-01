// 동전 0
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let [n, k] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v, 10));
const coins = input.flat().map((v) => parseInt(v, 10));
let answer = 0;

for (let i = n - 1; i >= 0; i--) {
  const curr = coins[i];
  if (k / curr >= 1) {
    answer += Math.floor(k / curr);
    k -= Math.floor(k / curr) * curr;
  }
  if (k === 0) break;
}

console.log(answer);
