// 카잉 달력 : 수학, 브루트 포스
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [num] = arr.shift();
const answer = [];

for ([m, n, x, y] of arr) {
  let xp = x;
  let yp = x;
  const cache = {};
  while (true) {
    // yp + m이 아니라 xp
    // 복잡하게 생각할 것이 아니라, 수에서 n으로 나눴을 때 나머지를 구하면 됨
    yp = xp % n === 0 ? n : xp % n;
    if (yp === y) break;
    xp += m;
    if (cache[yp]) {
      xp = -1;
      break;
    }
    cache[yp] = true;
  }
  answer.push(xp);
}

console.log(answer.join("\n"));
