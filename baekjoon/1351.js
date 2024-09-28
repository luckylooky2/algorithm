// 무한 수열 : 동적 계획법, 해시를 사용한 집합과 맵, 재귀
const [n, p, q] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split(" ")
  .map((v) => +v);
const cache = {};

function recur(n) {
  if (cache[n]) {
    return cache[n];
  }

  if (n === 0) {
    return 1;
  }
  const res = recur(Math.floor(n / p)) + recur(Math.floor(n / q));
  if (cache[n] === undefined) {
    cache[n] = res;
  }
  return res;
}

console.log(recur(n));
