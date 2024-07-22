// 서울에서 경산까지 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [cityCnt, maxMinute] = input.shift();
const [WALK, RIDE] = [0, 1];
// table[cityIndex][WALK | RIDE]
const table = input.map(([a, b, c, d]) => [
  [a, b],
  [c, d],
]);
const dp = new Array(cityCnt)
  .fill(null)
  .map(() => new Array(maxMinute + 1).fill(-Infinity));

const [walks, rides] = table[0];
for (let i = 1; i <= maxMinute; i++) {
  if (i >= walks[0]) {
    dp[0][i] = walks[1];
  }
  if (i >= rides[0]) {
    dp[0][i] = Math.max(dp[0][i], rides[1]);
  }
}

for (let i = 1; i < cityCnt; i++) {
  const [[walkTime, walkMoney], [rideTime, rideMoney]] = table[i];
  for (let j = 1; j <= maxMinute; j++) {
    if (j >= walkTime) {
      dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - walkTime] + walkMoney);
    }
    if (j >= rideTime) {
      dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - rideTime] + rideMoney);
    }
  }
}

console.log(dp[cityCnt - 1][maxMinute]);
