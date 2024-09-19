// 동전 : 동적 계획법, 배낭 문제
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const t = +input[0];
let idx = 1;
const answer = [];

while (idx < input.length) {
  const n = +input[idx++];
  const coins = input[idx++].split(" ").map((v) => +v);
  const target = +input[idx++];
  const dp = new Array(n + 1).fill(null).map(() => new Array(target + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const currCoin = coins[i - 1];
    for (let j = 1; j <= target; j++) {
      // 1. 현재 코인을 한 개도 사용하지 않을 때
      let cases = dp[i - 1][j];
      // 2. 현재 코인을 최소 한 개는 사용할 때
      if (j >= currCoin) {
        cases += dp[i][j - currCoin];
      }
      // 3. 현재 코인 단 한 개만 사용할 때
      if (j === currCoin) {
        cases++;
      }
      dp[i][j] = cases;
    }
  }
  answer.push(dp[n][target]);
}

console.log(answer.join("\n"));

// a를 사용하여 b를 만드는 경우를 세 가지 케이스로 나눌 수 있음
// 1. a를 한 개도 사용하지 않고 b를 만들 때
// 2. a를 최소 한 개는 사용하여 b를 만들 때(즉, b - a(단, b >= a)를 만드는 경우의 수)
// 3. a 단 하나만 사용하여 b를 만들 때(a === b)

// 1 2 4
// 3: 1 1 1 / 1 2
// 4: 1 1 1 1 / 1 1 2, 2 2 / 4

// 2
// 1 2
// 1000

// 3
// 1 5 10
// 100

// 2
// 5 7
// 22
