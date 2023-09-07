// 타일 채우기 : 동적 계획법
const n = parseInt(
  require("fs").readFileSync("/dev/stdin").toString().trim(),
  10
);
const dp = [1, 0, 3];

for (let j = 3; j <= n; j++) {
  let result = 0;
  if (j % 2 === 0) {
    let tmp = j - 4;
    result += dp[j - 2] * 3;
    while (tmp >= 0) {
      result += dp[tmp] * 2;
      tmp -= 2;
    }
  }
  dp.push(result);
}

console.log(dp[n]);
