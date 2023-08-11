// 설탕 배달 : 동적 계획법, 그리디
const fs = require("fs");
const [amount] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v, 10));

// 그리디
// let three = 0,
//   five = 0;

// for (i = Math.floor(amount / 5); i >= 0; i--) {
//   let rest = amount - i * 5;
//   if (rest === 0) {
//     five = i;
//     break;
//   } else if (rest % 3 === 0) {
//     five = i;
//     three = rest / 3;
//     break;
//   }
// }
// console.log(i == -1 ? i : five + three);

// 동적 계획법
const dp = new Array(amount + 1).fill(-1);

dp[0] = 0;
dp[3] = 1;
dp[5] = 1;

for (let i = 6; i <= amount; i++) {
  const three = dp[i - 3];
  const five = dp[i - 5];
  if (three === -1 && five === -1) dp[i] = -1;
  else if (three === -1 || five === -1) dp[i] = Math.max(three, five) + 1;
  else dp[i] = Math.min(three, five) + 1;
}

console.log(dp[amount]);
