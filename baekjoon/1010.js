// 다리 놓기 : 조합, 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v, i) =>
    i === 0 ? parseInt(v, 10) : v.split(" ").map((v) => parseInt(v, 10))
  );
const n = input.shift()[0];

// 조합(재귀 호출) ver.
// const cache = {};

// function combination(n, r) {
//   // 캐시에서 결과를 찾아 반환
//   if (cache[`${n}C${r}`]) {
//     return cache[`${n}C${r}`];
//   }

//   if (r === 0 || n === r) {
//     return 1;
//   }

//   // 캐시에 저장하고 재귀적으로 계산
//   const result = combination(n - 1, r - 1) + combination(n - 1, r);
//   cache[`${n}C${r}`] = result;

//   return result;
// }

// // 1부터 시작
// for (let i = 1; i <= n; i++) {
//   console.log(combination(input[i][1], input[i][0]));
// }

// console.log(cache);

// 동적 계획법 ver.
const dp = [[1], [1, 1]];

input.forEach((element) => {
  for (let i = dp.length; i <= element[1]; i++) {
    const lst = [];
    for (let j = 0; j <= i; j++) {
      lst[j] = (j === 0 ? 0 : dp[i - 1][j - 1]) + (j === i ? 0 : dp[i - 1][j]);
    }
    dp.push(lst);
  }
  console.log(dp[element[1]][element[0]]);
});
