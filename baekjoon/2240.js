// 자두나무 : 동적 계획법
const input = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n");
const [t, w] = input
  .shift()
  .split(" ")
  .map((v) => Number(v));
const location = input.map((v) => Number(v));
// dp[i][j]: i초에 j번 움직였을 때의 최대 받을 수 있는 개수의 합
const dp = new Array(t + 1).fill(null).map(() => new Array(w + 1).fill(0));
let answer = 0;

for (let i = 1; i <= t; i++) {
  // 움직인 횟수
  for (let j = 0; j <= w; j++) {
    // curr은 1 또는 2
    const curr = (j % 2) + 1;
    const isPlus = location[i - 1] === curr ? 1 : 0;
    // 움직이지 않았을 때
    const stayingFromPrev = dp[i - 1][j];
    // 움직였을 때
    const movingFromPrev = dp[i - 1][j ? j - 1 : 0];
    dp[i][j] = Math.max(stayingFromPrev, movingFromPrev) + isPlus;
    answer = Math.max(answer, dp[i][j]);
  }
}

console.log(answer);

// Try 1: 3차원 dp
// - dp[i][j][k]: i초에 j번 움직였을 때의 1과 2에서의 각각 최대로 받을 수 있는 개수
// - k는 하나로 합쳐도 상관없음 => 2차원 dp로 수정

// Try 2: 2차원 dp
// - dp[i][j]: i초에 j번 움직였을 때의 최대로 받을 수 있는 개수의 합
// - 이전 초에서 움직이지 않았을 때와 움직였을 때의 최대값을 참조
// - 두 경우만 참조하여도 이전의 모든 경우의 수를 저장하고 있음
