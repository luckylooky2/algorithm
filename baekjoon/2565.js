// 전깃줄 : 동적 계획법, 가장 긴 증가하는 부분 수열
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = arr.shift();
const sorted = arr.sort((a, b) => a[0] - b[0]);
const answer = [null];
let max = -Infinity;

sorted.map((v, i) => {
  let result = 0;
  for (let j = 0; j < i; j++) {
    // 사각형 조건
    if (sorted[j][0] < v[0] && sorted[j][1] < v[1])
      result = Math.max(answer[j + 1], result);
  }
  max = Math.max(result + 1, max);
  answer.push(result + 1);
});

console.log(n - max);
