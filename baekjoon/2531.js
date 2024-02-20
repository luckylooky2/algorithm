// 회전 초밥 : 투 포인터, 슬라이딩 윈도우, 브루트 포스
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, d, k, c] = input
  .shift()
  .split(" ")
  .map((v) => Number(v));
const sushi = input.map((v) => Number(v));
const cache = {
  add: function (target) {
    if (this[target] === undefined) {
      this[target] = 1;
    } else if (this[target] > 0) {
      this[target]++;
    }
  },
  subtract: function (target) {
    this[target]--;
    if (this[target] === 0) {
      delete this[target];
    }
  },
};
let p1 = 0,
  p2 = k - 1;
const ate = sushi.slice(p1, p2 + 1);
let answer = 0;

for (let sushi of ate) {
  cache.add(sushi);
}

while (true) {
  const bonus = cache[c] === undefined ? 1 : 0;
  answer = Math.max(answer, Object.keys(cache).length - 2 + bonus);
  p1 = (p1 + 1) % n;
  p2 = (p2 + 1) % n;
  if (p1 === 0) {
    console.log(answer);
    break;
  }
  const last = sushi[p2];
  const first = ate.shift();
  ate.push(last);
  cache.add(last);
  cache.subtract(first);
}
