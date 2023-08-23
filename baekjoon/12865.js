// 평범한 배낭 : 동적 계획법

const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const [n, capacity] = arr.shift();

const dp = new Array(n + 1)
  .fill(null)
  .map(() => new Array(capacity + 1).fill(0));

for (let i = 1; i <= n; ++i) {
  for (let j = 1; j <= capacity; j++) {
    const newWeight = arr[i - 1][0];
    const newValue = arr[i - 1][1];
    if (newWeight <= j) {
      dp[i][j] = Math.max(newValue + dp[i - 1][j - newWeight], dp[i - 1][j]);
    } else {
      dp[i][j] = dp[i - 1][j];
    }
  }
}

console.log(dp[n][capacity]);

// const arr = require("fs")
//   .readFileSync("/dev/stdin")
//   .toString()
//   .trim()
//   .split("\n")
//   .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

// const [n, total] = arr.shift();
// const list = {};
// const cache = {};
// const exclude = {};
// arr.map((v) => (list[v[0]] = v[1]));
// arr.map((v) => (exclude[v[0]] = []));
// arr.sort((a, b) => a[0] - b[0]);

// for (let i = arr[0][0]; i <= total; i++) {
//   let res = -Infinity;
//   let first, second;
//   if (list[i]) {
//     cache[i] = list[i];
//     continue;
//   }
//   for (let j = 1; j <= Math.floor(i / 2); j++) {
//     if (!cache[j] || !cache[i - j] || j === i - j) continue;
//     if (exclude[j].includes(i - j)) continue;

//     if (res < cache[j] + cache[i - j]) {
//       res = cache[j] + cache[i - j];
//       first = j;
//       second = i - j;
//     }
//   }
//   if (res !== -Infinity) {
//     if (!exclude[first]) exclude[second] = [i];
//     else exclude[first].push(i);
//     if (!exclude[second]) exclude[second] = [i];
//     else exclude[second].push(i);
//     cache[i] = res;
//   }
// }
// let i = total;
// if (!cache[total]) {
//   i--;
//   while (!cache[i]) i--;
// }
// console.log(cache[i]);
