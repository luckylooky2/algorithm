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

// 1. js number type이 부동 소수점을 사용하기 때문에, 매우 큰 값을 사용하기 위해서는 BigInt로 변환하여 사용해야 함
// - C에서 오버플로우와는 다른 이유
// - 단순히 각 단계에서 % c로 나머지만 구해준다고 해결되는 문제는 아님
// - why? 중간에 곱셈을 하는 단계에서(firstRes * secondRes) 매우 큰 숫자가 될 가능성
// - 나머지가 INT_MAX이기 때문에 발생한 문제
// - e.g. 2147483647 * 2147483647
