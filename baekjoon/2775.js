const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => parseInt(v, 10));
const dp = [];
const arr = [];

for (let i = 1; i < input.length; i += 2) arr.push([input[i], input[i + 1]]);
dp.push(Array.from({ length: 15 }, (v, i) => i));
dp[0][0] = null;

arr.map((v) => {
  for (let i = dp.length; i <= v[0]; i++) {
    const lst = [null, 1];
    for (let j = 2; j < 15; j++) {
      lst.push(lst[j - 1] + dp[i - 1][j]);
    }
    dp.push(lst);
  }
  console.log(dp[v[0]][v[1]]);
});
