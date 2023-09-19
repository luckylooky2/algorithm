// 동물원 : 동적 계획법
const n = parseInt(
  require("fs").readFileSync("/dev/stdin").toString().trim(),
  10
);
const dp = new Array(n + 1).fill(0);
let prev = 0;
let answer = 1;

for (let i = 1; i <= n; i++) {
  prev = (prev + (i - 2 >= 0 ? dp[i - 2] * 2 : 0)) % 9901;
  dp[i] = (dp[i - 1] + prev + 1) % 9901;
  answer = (answer + dp[i] * 2) % 9901;
}

console.log(answer);
