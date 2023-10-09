// 곱셈 : 분할 정복, 재귀 호출
let [a, b, c] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v, 10));

const cache = { 0: BigInt(1 % c), 1: BigInt(a % c) };

function recur(b) {
  if (b === 1 || b === 0) return cache[b];

  const first = Math.floor(b / 2);
  const second = b - first;
  const firstRes = recur(first);
  cache[first] = firstRes;

  let secondRes = 0;
  if (first !== second) {
    const res = BigInt(firstRes) * BigInt(a);
    const times = res / BigInt(c);
    secondRes = res - times * BigInt(c);
  } else secondRes = cache[first];
  cache[second] = secondRes;

  const res = BigInt(firstRes) * BigInt(secondRes);
  const times = res / BigInt(c);
  const answer = res - times * BigInt(c);
  return answer;
}

console.log(String(recur(b)));
