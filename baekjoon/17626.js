// Four Squares : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = Number(input[0]);
const dp = new Array(n + 1).fill(0);
for (let i = 1; i <= 3; i++) {
  dp[i] = i;
}
for (let i = 4; i <= n; i++) {
  if (Math.sqrt(i) % 1 === 0) {
    dp[i] = 1;
  } else {
    let min = 4;
    for (let j = 1; j * j <= i; j++) {
      const [first, second] = [j * j, i - j * j];
      min = Math.min(min, dp[first] + dp[second]);
    }
    dp[i] = min;
  }
}

console.log(dp[n]);

// Try 1
// - 1부터 i까지 모두 순회 => 시간 초과
// - 시간을 줄이기 위해 굳이 순회를 하지 않아도 되는 것이 있는가?
// - 결국 이것을 해결하지 못해 답안을 보았다

// Answer
// - 1부터 i까지 모두 순회하는 것이 아니라 제곱수만 순회한다
// - 나머지 경우는 이 경우보다 반드시 크거나 같기 때문에 굳이 볼 필요가 없다
