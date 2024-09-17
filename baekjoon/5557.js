// 1학년 : 동적 계획법
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const arr = input.shift();
const target = arr.pop();
const dp = new Array(n - 1).fill(null).map(() => new Object());
dp[0][arr[0]] = 1n;

for (let i = 1; i < dp.length; i++) {
  const curr = arr[i];
  const entries = Object.entries(dp[i - 1]);
  for (const [key, value] of entries) {
    // 합친 값이 유효하다면, 이전 단계에서 합치기 전의 값을 더해준다
    const plus = +key + curr;
    if (plus <= 20) {
      if (dp[i][plus] === undefined) {
        dp[i][plus] = value;
      } else {
        dp[i][plus] += value;
      }
    }
    // 뺀 값이 유효하다면, 이전 단계에서 빼기 전의 값을 더해준다
    const minus = +key - curr;
    if (minus >= 0) {
      if (dp[i][minus] === undefined) {
        dp[i][minus] = value;
      } else {
        dp[i][minus] += value;
      }
    }
  }
}

const answer = dp[n - 2][target] ? dp[n - 2][target] : 0n;

console.log(String(answer));

// 순서는 상관이 있다: 중간 합이 0 이상 20을 넘으면 안 되므로
// 0 개수만큼 2를 곱해준다?

// Try 1 : 백트래킹
// - target(마지막 숫자)을 제외한 숫자를 모두 더한 후 target을 빼고 2로 나누어 빼야 할 총 합을 구한다
// - first(첫 숫자)를 제외한 숫자 배열를 선택하여 빼야 할 총 합이 되는 조합의 수를 구한다
// - 예제 결과 숫자가 매우 크기 때문에, 방법을 하나씩 세는 백트래킹 방법은 반드시 시간 초과가 발생한다

// Try 2 : 동적 계획법
// - 반드시 이 문제는 동적 계획법을 이용하여 풀어야 할 것 같았는데... 어떻게?
// - 2 * n 2차원 dp 배열? 어떤 단일 값을 저장할 것인가?
// - 저장할 값은 단일 값이 아니라 **이전 단계에서에서 현재 단계로 올 때 발생할 수 있는 모든 경우의 수**이다
// - 즉, 배열 또는 맵을 사용하여 현재 단계에서 발생할 수 있는 경우를 저장한다
// - 단, 이전 단계에서 다음 단계로 이동할 때 모든 원소에 대해 덧셈 / 뺄셈 연산이 1번씩 발생하므로 원칙적으로 O(2^n)이 되어 시간 초과가 발생한다
// - 하지만 문제에서 모든 단계에서 가능한 값은 0 ~ 20 라고 했기 때문에, 하나의 단계에서 다음 단계로 계산할 때는 최대 20 * 2 번의 계산이 발생한다
// - n이 최대 100일 때, 최대 98 * 21 * 2 = 약 O(4000)의 시간 복잡도가 되어 시간 초과가 발생하지 않는다
