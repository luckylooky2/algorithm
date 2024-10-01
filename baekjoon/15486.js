// 퇴사 2 : 동적 계획법
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input[0];
const schedule = input;
const dp = new Array(n + 2).fill(0);
let answer = 0;

for (let day = 1; day <= n; day++) {
  const [cost, profit] = schedule[day];
  // 이전 날에 아무 것도 안 할 수도 있기 때문에, 이전의 최대값을 가져와 유지한다
  dp[day] = Math.max(dp[day - 1], dp[day]);
  if (day + cost <= n + 1) {
    dp[day + cost] = Math.max(dp[day + cost], dp[day] + profit);
    answer = Math.max(answer, dp[day + cost]);
  }
}

console.log(answer);

// Try 1
// - 현재 날짜의 profit을 cost일 후부터 n일까지 모두 더하는 방식
// - 문제점: 선형 시간 복잡도로 시간 초과, 날짜 a와 날짜 b가 동시에 처리할 수 없을수도 있는데 중복으로 계산됨

// Try 2
// - Math.max를 써볼까?
// - 현재 날짜에서 cost일 후에 dp[day] + profit을 업데이트: 현재 날짜의 최대값을 바탕으로 현재 일을 했을 때의 값
// - 현재 날짜의 최대값은 이전 날짜들에서 Math.max를 이용하여 이미 업데이트됨
// - n + 1일까지 계산한 이유: n일에 시작한 1일짜리 일도 계산해야 하기 때문. 경계값
