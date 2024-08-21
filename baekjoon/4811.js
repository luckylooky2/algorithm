// 알약 : 동적 계획법, 카탈란 수
const arr = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((v) => Number(v));
// catalan[31][2]
const catalan = new Array(31).fill(BigInt(0));
const answer = [];

catalan[0] = BigInt(1);
catalan[1] = BigInt(1);
for (let i = 2; i <= 30; i++) {
  for (let j = i - 1, k = 0; j >= 0; j--, k++) {
    catalan[i] += catalan[j] * catalan[k];
  }
}

for (const elem of arr) {
  if (elem === 0) {
    break;
  }
  answer.push(catalan[elem]);
}

console.log(answer.join("\n"));

// 1) 첫 번째는 반드시 w
// 2) h 개수가 w 개수가 되면 그 다음은 반드시 h

// Try 1
// - dp로 풀려고 했으나, 점화식을 잘못 찾음
// - dp[n][0] = dp[n - 1][0] * 3
// - dp[n][1] = dp[n - 1][0] + dp[n - 1][1]

// Try 2
// - 카탈란 수
// - c[n] = c[0] * c[n - 1] + c[1] * c[n - 2] + ... + c[n - 1] * c[0]
// - https://m.blog.naver.com/pyw0564/221523147108
