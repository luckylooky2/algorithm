// 1로 만들기 2 : 동적 계획법
const n = parseInt(
  require("fs").readFileSync("/dev/stdin").toString().trim(),
  10
);
const dp = new Array(n + 1).fill(0);
// 연산 횟수를 줄이기 위한 배열
const prev = new Array(n + 1).fill(0);
const answer = [n];

for (let i = 2; i <= n; i++) {
  const first = dp[i - 1];
  const second = (i / 2) % 1 === 0 ? dp[i / 2] : Infinity;
  const third = (i / 3) % 1 === 0 ? dp[i / 3] : Infinity;
  dp[i] = Math.min(first, second, third) + 1;
  switch (dp[i] - 1) {
    case first:
      prev[i] = i - 1;
      break;
    case second:
      prev[i] = i / 2;
      break;
    case third:
      prev[i] = i / 3;
      break;
  }
}
let copyN = n;
while (copyN > 1) {
  answer.push(prev[copyN]);
  copyN = prev[copyN];
}
console.log(dp[n]);
console.log(answer.join(" "));
