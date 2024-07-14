// 수들의 합 2 : 누적 합, 브루트 포스
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, m] = input.shift();
const arr = input.shift();
let prefixSum = new Array(n + 1).fill(0);
let answer = 0;

for (let i = 1; i <= arr.length; i++) {
  const curr = arr[i - 1];

  prefixSum[i] = prefixSum[i - 1] + curr;
  for (let j = 0; j < i; j++) {
    if (prefixSum[i] - prefixSum[j] === m) {
      answer++;
    }
  }
}

console.log(answer);
