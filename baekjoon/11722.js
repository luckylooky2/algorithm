// 가장 긴 감소하는 부분 수열 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = Number(input.shift());
const numArr = input
  .shift()
  .split(" ")
  .map((v) => Number(v));
const dp = new Array(n).fill(0);
let max = 1;

dp[0] = 1;
for (let i = 1; i < n; i++) {
  const curr = numArr[i];
  for (let j = i - 1; j >= 0; j--) {
    if (curr < numArr[j]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
  dp[i] = Math.max(dp[i], 1);
  max = Math.max(max, dp[i]);
}
console.log(max);

// 23'00" / 60'00"

// 현재 dp[i]가 의미하는 것은 i번째 원소를 반드시 포함했을 때, 가장 긴 감소하는 부분 수열의 개수
// e.g. 6, [ 10 30 10 20 20 10 ]
// i = 0 : [ 10 ]
// i = 1 : [ 10 30 ] / [ 30 ]
// - 0의 경우의 수 + 1의 경우의 수
// i = 2 : [ 10 10 ] / [ 30 10 ], [ 10 30 10 ] / [ 10 ]
// - 0의 경우의 수 + 1의 경우의 수 + 2의 경우의 수
// i = 3 : [ 10 20 ] / [ 30 20 ], [ 10 30 20 ] / [ 10 20 ] [ 10 10 20 ], [ 30 10 20 ], [ 10 30 10 20 ] / [ 20 ]

// 원래는 1개 뽑을 때, 2개 뽑을 때 ... 모든 경우의 수(n^2)를 고려해야 하지만
// j = 1, 2 ... 일 때의 최대값을 구하고 저장함으로써 축소하여 생각(n)할 수 있으므로 조금 더 효율적인 방법이다
// 정답은 i번째 원소를 포함할 수도 있고 아닐수도 있으므로 dp[n - 1]이 답이 아니라 모든 dp 배열에서 가장 큰 값이다

// nC0, nC1, ... nCn을 모두 고려해야 하는 경우에는 dp를 바로 생각하자
