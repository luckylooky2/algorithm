// 서울에서 경산까지 : 동적 계획법, 배낭 문제
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

// 배낭 문제 풀이법
// - 열(최대시간), 행(도시), 값(모금액)
// - 현재 도시를 반드시 거쳐야 하기 때문에 dp[i - 1][j]에서는 가져오지 않음
// - 현재 시간을 채우는 방법: 이전 도시에서(i - 1) 현재 시간이 되게하는 두 가지 방법(j - walkTime, j - rideTime)을 참조

// - 모든 값을 -Infinity로 초기화 : 어떠한 방법을 사용하더라도 도달할 수 없는 시간
// - 각각의 도시에서 최소값을 누적한 값 이전의 모든 열은 -Infinity
// - 최소값 누적한 값 이후에는 값이 존재 => 100분으로 갈 수 있는 곳은 101분이어도 갈 수 있기 때문
// - dp[i - 1][j - walkTime], dp[i - 1][j - rideTime] 둘 중에 하나라도 값이 있으면 의미가 있는 시간(최대 시간 내 이동할 수 있음)
// - 없다면, 최소값을 누적한 값 이전의 열이라고 볼 수 있음
// - e.g.
// 3 10
// 1 1 3 3
// 3 3 5 5
// 5 5 7 7

// -Infinity 1 1 3 3 3 3 3 3 3 3 (1 - 1 = 0)
// -Infinity -Infinity -Infinity -Infinity 4 4 6 6 8 8 8 (1 + 3 - 1 = 3)
// -Infinity -Infinity -Infinity -Infinity -Infinity -Infinity -Infinity -Infinity -Infinity 9 9 (1 + 3 + 5 - 1 = 8)
