// 카잉 달력
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
    if (yp === y) break;
    yp = (yp + m) % n === 0 ? n : (yp + m) % n;
    xp += m;
    if (cache[yp]) {
      console.log(cache);
      xp = -1;
      break;
    }
    cache[yp] = true;
  }
  answer.push(xp);
}

console.log(answer.join("\n"));
