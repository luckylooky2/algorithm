// 공통 부분 문자열 : 동적 계획법
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const [str1, str2] = input;
const [n, m] = [str1.length, str2.length];
const dp = new Array(n + 1).fill(null).map(() => new Array(m + 1).fill(0));
let answer = 0;

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    // 연속된 문자열만 세는 부분
    if (str1[i - 1] === str2[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
      answer = Math.max(answer, dp[i][j]);
    }
    // 연속되지 않은 문자열을 세는 부분
    // else {
    //   dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    // }
  }
}

console.log(answer);

// LCS와 비슷하지만 다른 문제
// - LCS는 연속되지 않은 문자열만 유효하지만, 이 문제는 반드시 연속된 문자열만 유효하다

// - e.g. ACAYKP / CAPCAK
// - LCS: ACAK
// - 이 문제: CA
