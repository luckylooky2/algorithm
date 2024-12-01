// 2의 멱수의 합 : 동적 계획법
const n = +require("fs").readFileSync(0, "utf-8").trim();
const maxPower = Math.floor(Math.log2(n));
const dp = new Array(n + 1).fill(1);

// 1, 2, 4, 8 ...
for (let i = 1; i <= maxPower; i++) {
  const number = Math.pow(2, i);
  // 1, 2, 3, 4, ... n
  for (let j = number; j <= n; j++) {
    dp[j] = (dp[j] + dp[j - number]) % 1_000_000_000;
  }
}

console.log(dp[n]);

// 동전 문제로 바꿔서 생각할 수 있음

// 동전 문제일 때 고려해 볼 것
// - 한 줄로 가능한지?

// 또 다른 규칙을 찾을 수 있는가?
