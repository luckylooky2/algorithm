// 연속합 2 : 동적 계획법
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const arr = input.shift();
const dp = new Array(2).fill(null).map(() => new Array(n).fill(0));
let answer = -Infinity;

for (let i = 0; i < arr.length; i++) {
  const curr = arr[i];
  // no skip: 이전까지 더한 수보다 현재가 더 크다면, 현재로 초기화
  dp[0][i] = Math.max(curr, (i > 0 ? dp[0][i - 1] : 0) + curr);
  // skip
  // - dp[0][i - 1]: 건너뛰지 않았을 때의 이전 항(현재를 건너뛴 경우)
  // - dp[1][i - 1] + curr: 건너뛰었을 때의 이전 항(이전에서 건너뛴 경우 중 가장 최대값) + 현재 숫자
  dp[1][i] = i > 0 ? Math.max(dp[0][i - 1], dp[1][i - 1] + curr) : -Infinity;
  answer = Math.max(answer, dp[0][i], dp[1][i]);
}

console.log(answer);

// Try 1
// - no skip: 연속된 부호의 수를 하나로 더하고, 현재 음수일 때 다음 수가 더 크다면 음수를 포함하는 방법으로 계샨
// - skip: 특정 수를 제외해야 하기 때문에, 음수는 하나로 더하지 않고 배열로 묶음. 뒤에 나오는 양수보다 합이 큰 음수 묶음을 하나씩 순회하면서 합계를 구함

// Try 2 : 동적 계획법
// - 생각한 이유? 이전에 계산했던 값을 재사용할 수 있다고 생각
// - 0행: 건너뛰지 않았을 때, 현재 순서에서 최대값
// - 1행: 하나를 건너뛴 경우(현재 숫자 or 이전 숫자)를 포함하여, 현재 순서에서 최대값
