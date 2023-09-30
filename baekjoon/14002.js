// 가장 긴 증가하는 부분 수열 4 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const arr = input.shift();
const dp = new Array(n + 1).fill([]);
let maxArr = [];

for (let i = 1; i <= n; i++) {
  const curr = arr[i - 1];
  const lst = [];
  let maxLen = -Infinity;
  let index = 0;
  for (let j = 0; j < i; j++) {
    if (dp[j].length === 0) lst.push([curr]);
    else if (dp[j][dp[j].length - 1] < curr) lst.push(dp[j].concat([curr]));
  }
  for (let i = 0; i < lst.length; i++) {
    maxLen = Math.max(lst[i].length, maxLen);
    if (maxLen === lst[i].length) index = i;
  }
  dp[i] = lst[index];
  if (maxArr.length < dp[i].length) maxArr = dp[i];
}

console.log(maxArr.length);
console.log(maxArr.join(" "));
