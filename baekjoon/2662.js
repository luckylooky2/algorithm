// 기업투자 : 동적 계획법, 배낭 문제
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, m] = input.shift();
const table = input;
const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(0));
const track = new Array(m + 1)
  .fill(null)
  .map(() => new Array(n + 1).fill(null).map(() => new Object()));

for (let j = 1; j <= n; j++) {
  dp[1][j] = table[j - 1][1];
  track[1][j][1] = j;
}

for (let i = 2; i <= m; i++) {
  for (let j = 1; j <= n; j++) {
    // 현재 사용 x
    const c1 = dp[i - 1][j];
    // 현재만 사용
    const c2 = table[j - 1][i];
    // 현재와 다른 것 함께 사용
    let c3 = 0;
    for (let k = 1; k < j; k++) {
      const rest = j - k;
      const res = dp[i - 1][k] + table[rest - 1][i];
      if (c3 < res) {
        c3 = dp[i - 1][k] + table[rest - 1][i];
        track[i][j] = { ...track[i - 1][k] };
        track[i][j][i] = rest;
      }
    }
    dp[i][j] = Math.max(c1, c2, c3);
    if (c1 === dp[i][j]) {
      track[i][j] = { ...track[i - 1][j] };
    } else if (c2 === dp[i][j]) {
      track[i][j] = {};
      track[i][j][i] = j;
    }
  }
}

const tracked = Object.entries(track[m][n]);
const answer = new Array(m).fill(0);
for (const [key, value] of tracked) {
  answer[Number(key - 1)] = value;
}

console.log(dp[m][n]);
console.log(answer.join(" "));

// 중복해서 고를 수 없는 배낭 문제 + 트래킹
// - 트래킹을 위한 2차원 객체 배열 추가
