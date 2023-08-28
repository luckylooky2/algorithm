// 스티커 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const [length] = input.shift();
const count = [];
const arr = [];

for (let i = 0; i < length; i++) {
  count.push(input.shift()[0]);
  arr.push([input.shift(), input.shift()]);
}

for (let p = 0; p < length; p++) {
  const currCount = count[p];
  const currArr = arr[p];
  const dp = new Array(currCount + 1)
    .fill(null)
    .map(() => new Array(2).fill(0));

  for (let i = 1; i <= currCount; i++) {
    for (let j = 0; j < 2; j++) {
      dp[i][j] =
        currArr[j][i - 1] +
        Math.max(
          dp[i - 1][j === 0 ? 1 : 0],
          i >= 2 ? dp[i - 2][j === 0 ? 1 : 0] : 0
        );
    }
  }
  console.log(Math.max(dp[currCount][0], dp[currCount][1]));
}
