// 가장 긴 바이토닉 부분 수열 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const [arr] = input;
arr.unshift(0);
let max = 0;

const dp = new Array(2).fill(null).map(() => new Array(n + 1).fill(0));

for (let i = 1; i <= n; i++) {
  let upMax = 0,
    downMax = 0;
  const curr = arr[i];
  for (let j = 0; j < i; j++) {
    // curr 보다 작은 값들 중에 dp[0] 값이 제일 큰 것 찾기
    if (curr > arr[j]) upMax = Math.max(dp[0][j], upMax);
    // curr 보다 큰 값들 중에서 do[0], dp[1] 값이 제일 큰 것 찾기
    if (curr < arr[j]) downMax = Math.max(dp[0][j], dp[1][j], downMax);
  }
  dp[0][i] = upMax + 1;
  dp[1][i] = downMax + 1;
  max = Math.max(dp[0][i], dp[1][i], max);
}

console.log(max);
