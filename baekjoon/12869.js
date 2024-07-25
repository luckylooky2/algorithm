// 뮤탈리스크 : 동적 계획법, 너비 우선 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [scvCount] = input.shift();
let healths = input.shift().concat("0".repeat(3 - scvCount).split(""));
const maxHp = healths.sort((a, b) => b - a)[0];
const dp = new Array(maxHp + 1)
  .fill(null)
  .map(() =>
    new Array(maxHp + 1).fill(null).map(() => new Array(maxHp + 1).fill(0))
  );
const attacks = [
  [9, 3, 1],
  [9, 1, 3],
  [3, 9, 1],
  [3, 1, 9],
  [1, 9, 3],
  [1, 3, 9],
];

dp[healths[0]][healths[1]][healths[2]] = 1;

for (let a = maxHp; a >= 0; a--) {
  for (let b = maxHp; b >= 0; b--) {
    for (let c = maxHp; c >= 0; c--) {
      if (dp[a][b][c] > 0) {
        for (const attack of attacks) {
          const na = Math.max(0, a - attack[0]);
          const nb = Math.max(0, b - attack[1]);
          const nc = Math.max(0, c - attack[2]);
          if (dp[na][nb][nc] === 0 || dp[na][nb][nc] > dp[a][b][c] + 1) {
            dp[na][nb][nc] = dp[a][b][c] + 1;
          }
        }
      }
    }
  }
}

console.log(dp[0][0][0] - 1);

// Try 1 : 그리디
// - 가장 큰 숫자에서 9를 빼고, 나머지를 3 또는 1이라고 생각하는 방법
// - 가장 큰 숫자에서 9를 빼는 것에도 예외가 있을 듯?

// Try 2 : 동적 계획법
// - maxHp^3 3차원 dp 배열을 BFS 방식과 비슷하게 사용하는 방법
// - [12, 10, 4] = 1에서 시작해서 6가지 경우의 수를 모두 계산한 인덱스에 x + 1 저장
// - 저장된 곳에서 같은 방식으로 6군데에 저장 => ... => [0, 0, 0]이 나올 때까지 반복
// - 방문한 곳에서 다시 뻗어져 나간다는 점에서 BFS와 유사한 것 같음
