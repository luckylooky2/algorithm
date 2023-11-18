// 세 수의 합 : 이분 탐색
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => parseInt(v, 10));
const n = arr.shift();
const sorted = arr.sort((a, b) => a - b);
let flag = false;

for (let k = n - 1; k >= 0; k--) {
  const target = sorted[k];
  for (let i = n - 2; i >= 0; i--) {
    for (let j = n - 2; j >= 0; j--) {
      // 3개 중 2개를 브루트 포스로 탐색
      const diff = target - sorted[i] - sorted[j];
      if (diff <= 0) continue;
      // 나머지 1개를 이분 탐색
      if (sorted.includes(diff)) {
        flag = true;
        console.log(target);
        break;
      }
    }
    if (flag) break;
  }
  if (flag) break;
}
