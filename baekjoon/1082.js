// 방 번호 : 동적 계획법, 그리디
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = Number(input.shift());
const prices = input
  .shift()
  .split(" ")
  .map((v) => Number(v));
const m = Number(input.shift());
const dp = new Array(n).fill(null).map(() => new Array(m + 1).fill(""));

for (let j = 1; j <= m; j++) {
  const currPrice = prices[0];
  const quotinent = Math.floor(j / currPrice);
  dp[0][j] = String("0").repeat(quotinent);
}

for (let i = 1; i < prices.length; i++) {
  for (let j = 1; j <= m; j++) {
    const candidates = [];
    const currPrice = prices[i];
    const quotinent = Math.floor(j / currPrice);
    // 현재 숫자를 하나도 안 사용하는 경우
    const prev = dp[i - 1][j];
    if (prev !== "") {
      candidates.push(prev);
    }
    // 현재의 숫자만 모두 사용하는 경우
    const curr = String(`${i}`).repeat(quotinent);
    if (quotinent > 0) {
      candidates.push(curr);
    }
    // 현재 숫자를 최소 1개만 사용하는 경우
    for (let k = i; k >= 0; k--) {
      const index = j - currPrice;
      if (index < 0) {
        candidates.push("");
      } else {
        candidates.push(
          (dp[k][index] + `${i}`).split("").sort().reverse().join("")
        );
      }
    }
    const sorted = candidates.sort((a, b) => {
      const str1 = Number(a.split("").sort().reverse().join(""));
      const str2 = Number(b.split("").sort().reverse().join(""));
      return str2 - str1;
    });
    dp[i][j] = sorted[0] === undefined ? "" : sorted[0];
  }
}

console.log(String(BigInt(dp[n - 1][m])));
