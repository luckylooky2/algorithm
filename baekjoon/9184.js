// 신나는 함수 실행 : 동적 계획법
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const cache = {};

function w(a, b, c) {
  if (cache[`${a} ${b} ${c}`]) return cache[`${a} ${b} ${c}`];
  if (a <= 0 || b <= 0 || c <= 0) return 1;
  if (a > 20 || b > 20 || c > 20) return w(20, 20, 20);
  if (a < b && b < c) {
    const res = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c);
    cache[`${a} ${b} ${c}`] = res;
    return res;
  } else {
    const res =
      w(a - 1, b, c) +
      w(a - 1, b - 1, c) +
      w(a - 1, b, c - 1) -
      w(a - 1, b - 1, c - 1);
    cache[`${a} ${b} ${c}`] = res;
    return res;
  }
}

arr.map(([a, b, c]) => {
  if (a === -1 && b === -1 && c === -1) return;
  console.log(`w(${a}, ${b}, ${c}) = ${w(a, b, c)}`);
});
