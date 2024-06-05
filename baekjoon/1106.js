// 호텔 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [c, n] = input.shift();
const promote = input;
const cache = {};

for (const [cost, customers] of promote) {
  if (cache[customers]) {
    cache[customers] = Math.min(cache[customers], cost);
  } else {
    cache[customers] = cost;
  }
}

const list = Object.entries(cache).map(([k, v]) => [Number(k), v]);
const dp = new Array(list.length + 1)
  .fill(null)
  .map(() => new Array(c + 1).fill(Infinity));

for (let i = 1; i <= c; i++) {
  dp[1][i] = Math.ceil(i / list[0][0]) * list[0][1];
}

for (let i = 2; i <= list.length; i++) {
  for (let j = 1; j <= c; j++) {
    // 현재를 고려하지 않은 이전의 최소값
    const prev = dp[i - 1][j];
    // 현재를 반드시 포함하는 최소값
    const curr1 =
      j >= list[i - 1][0]
        ? dp[i][j - list[i - 1][0]] + list[i - 1][1]
        : Infinity;
    // 위에서도 구하지 못한 경우, 현재의 배수를 최소값으로 처리
    const curr2 = Math.ceil(j / list[i - 1][0]) * list[i - 1][1];

    dp[i][j] = Math.min(prev, curr1, curr2);
  }
}

console.log(dp[list.length][c]);

// 몫이 0 일 때도 1이 되어야 한다 => 모든 경우에 ceil 함수를 호출
// - 이전에는 몫이 0일 때, Infinity로 처리하였다
