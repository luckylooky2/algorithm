// 동전 0 : 그리디
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let [n, k] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v, 10));
const coins = input.flat().map((v) => parseInt(v, 10));
let answer = 0;

for (let i = n - 1; i >= 0; i--) {
  const curr = coins[i];
  if (k / curr >= 1) {
    answer += Math.floor(k / curr);
    k -= Math.floor(k / curr) * curr;
  }
  if (k === 0) break;
}

console.log(answer);

// dp ver.
// // const K = 4790;
// // const c = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000];
// const K = 18;
// const c = [2, 9, 10];
// const N = c.length;
// const dp = new Array(N + 1)
//   .fill(null)
//   .map(() => new Array(K + 1).fill(Infinity));

// for (let i = 1; i <= N; i++) {
//   const curr = c[i - 1];
//   for (let j = 1; j <= K; j++) {
//     const quotinent = Math.floor(j / curr);
//     // 큰 순서대로 정렬 되어 있으므로, 나머지가 0이면 답
//     if ((j / curr) % 1 === 0) dp[i][j] = quotinent;
//     // 몫이 0이면, 바로 위에 dp 테이블에서 가져옴
//     else if (quotinent === 0) dp[i][j] = dp[i - 1][j];
//     // 몫이 1이상이면
//     else {
//       const remainder = j - curr * quotinent;
//       // 현재 동전을 쓰지 않고 만드는 방법(바로 위)과 현재 동전을 하나를 반드시 사용하고 만드는 방법(같은 줄 왼쪽)
//       dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - curr] + 1);
//     }
//   }
// }

// console.log(dp[N][K]);
