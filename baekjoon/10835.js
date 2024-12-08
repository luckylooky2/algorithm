// 카드 게임 : 동적 계획법
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const leftCards = input.shift();
const rightCards = input.shift();
const dp = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(-1));
let answer = 0;

dp[0][0] = 0;

for (let leftIndex = 0; leftIndex < n; leftIndex++) {
  const left = leftCards[leftIndex];
  for (let rightIndex = 0; rightIndex < n; rightIndex++) {
    const right = rightCards[rightIndex];
    if (dp[leftIndex][rightIndex] === -1) {
      continue;
    }

    if (left > right) {
      dp[leftIndex][rightIndex + 1] = Math.max(dp[leftIndex][rightIndex] + right, dp[leftIndex][rightIndex + 1]);
    }
    dp[leftIndex + 1][rightIndex] = Math.max(dp[leftIndex][rightIndex], dp[leftIndex + 1][rightIndex]);
    dp[leftIndex + 1][rightIndex + 1] = Math.max(dp[leftIndex][rightIndex], dp[leftIndex + 1][rightIndex + 1]);
  }
}

for (let i = 0; i <= n; i++) {
  for (let j = 0; j <= n; j++) {
    if (dp[i][j] > answer) {
      answer = dp[i][j];
    }
  }
}

console.log(answer);

// Try 1: 그리디
// - 모든 경우의 수를 탐색한 것은 아니기 때문에 틀렸다.
// - 제출 시점에는 그리디가 틀렸다는 생각은 하지 못했다.
// - 오른쪽 카드가 왼쪽 카드보다 큰 수가 나올 때까지 왼쪽 카드를 계속 버리는 로직

// Try 2: dp
// - 2차원 dp 배열: 행(왼쪽 카드), 열(오른쪽 카드)
// - 1) 값: 현재 칸 기준 위쪽과 왼쪽의 최대값 => 오른쪽 카드를 마음대로 버리지 못하기 때문에 무조건 두 곳에서 가져올 수 없다.
// - 2) 값: 이전 턴을 진행한 결과 => 현재 칸 기준에서 움직일 수 있는 방향의 값을 업데이트한다. 모든 값을 -1로 초기화하여, 방문할 수 없는 곳을 체크한다.

// answer = Math.max(dp[leftIndex][rightIndex + 1], dp[leftIndex + 1][rightIndex + 1], dp[leftIndex + 1][rightIndex]);
// - 이 코드를 통해서 업데이트가 되는 시점에 answer을 업데이트하려고 했지만, 틀린 답이 나왔다.
// - 모든 순회가 끝난 다음, 다시 한 번 돌면서 최대값을 확인하는 것이 시간은 더 걸릴지 몰라도 확실한 방법이다.
