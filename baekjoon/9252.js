// LCS 2 : 동적 계획법
const [str1, str2] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const dp = new Array(str2.length + 1)
  .fill(null)
  .map(() => new Array(str1.length + 1).fill(0));
const answer = new Array(str2.length + 1)
  .fill(null)
  .map(() => new Array(str1.length + 1).fill(""));

// ACAYKP
// CAPCAK

for (let i = 1; i <= str2.length; i++) {
  for (let j = 1; j <= str1.length; j++) {
    if (str1[j - 1] === str2[i - 1]) {
      // 1. 각각 1개씩 추가할 때
      // - e.g. AC(A) C(A)
      // - 두 개가 같을 때 증가, 다를 때 그대로
      dp[i][j] = dp[i - 1][j - 1] + 1;
      answer[i][j] = answer[i - 1][j - 1] + str1[j - 1];
    } else {
      // 2. 1개만 추가할 때
      // - e.g. 1) AC(A) C / 2) AC C(A)
      // - 두 경우 중에 큰 값으로
      // - 추가된 값 나머지 값과 같다고 하더라도, 둘 다 같이 추가되어야 유효하므로 값은 증가하지 않음
      if (dp[i - 1][j] > dp[i][j - 1]) {
        dp[i][j] = dp[i - 1][j];
        answer[i][j] = answer[i - 1][j];
      } else {
        dp[i][j] = dp[i][j - 1];
        answer[i][j] = answer[i][j - 1];
      }
    }
  }
}

const length = dp[str2.length][str1.length];
console.log(length);
if (length) {
  console.log(answer[str2.length][str1.length]);
}

// 세 가지 경우만 확인해도 되는 이유
// - 둘 다 추가될 때만 값이 증가할 수 있다
// - 하나만 추가될 때는 절대 값이 증가할 수 없다
