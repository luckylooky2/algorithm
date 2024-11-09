// 다항식 게임 : 동적 계획법
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const numOfTests = +input.shift();
const tests = input.map((v) => v.split(" ").map((v) => +v));
const dp = new Array(21).fill(null).map(() => new Array(0n));
const answer = [];
dp[1] = [1n, 1n];

for (let i = 2; i <= 20; i++) {
  const max = (i * (i + 1)) / 2;
  dp[i] = new Array(max + 1).fill(0n);
  const chunk = i + 1;
  for (let j = 0; j < dp[i - 1].length; j++) {
    const pow = dp[i - 1][j];
    // max 자리 수부터 한 자리씩 뒤로 가면서(j) k개를 pow 만큼 더한다.
    for (let k = 0; k < chunk; k++) {
      dp[i][max - j - k] += pow;
    }
  }
}

for (const [n, k] of tests) {
  answer.push(dp[n][k]);
}

console.log(answer.join("\n"));
