// 수학은 너무 쉬워 : 수학, 소수, 에라토스테네스의 체
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const numbers = input.shift();
const divides = new Array(n).fill(null).map(() => new Object());
const primes = [];
const limit = 500000;
let count = 0;

// 소수 구하기: O(n√n) => 비효율적
// - 1. 반복적인 검사: 각 수에 대해 2부터 그 수의 제곱근까지 모든 수로 나누어 보아야 하므로 많은 반복이 발생
// - 2. 배수 제거를 사용하지 않음: 각 수에 대해 매번 나눗셈 검사를 수행하므로 중복된 계산이 많음
// for (let i = 2; i <= limit; i++) {
//   let flag = false;
//   const root = Math.sqrt(i);
//   for (let j = 2; j <= root; j++) {
//     if (i % j === 0) {
//       flag = true;
//       break;
//     }
//   }
//   if (!flag) {
//     primes.push(i);
//   }
// }

// 아리토스테네스의 체: O(nloglogn)
// - 소수의 배수를 제거하여 나가는 방법
// - 단, 가지치기를 통해 경우의 수를 제외하여 효율적
// - 308ms -> 212ms
const isPrime = new Array(limit + 1).fill(true);

isPrime[0] = isPrime[1] = false;
// 1. 왜 limit의 제곱근까지만 순회하는가?
// - 내부에서 i * i 부터 순회하기 때문
for (let i = 2; i <= Math.sqrt(limit); i++) {
  // 2. 소수가 아니라면 배수를 확인하지 않아도 되는가? YES
  // - 해당 수가 소수가 아니라면 그 수의 배수 역시 소수가 아니라는 것을 확신할 수 있음
  // - 소수가 아니라는 뜻은 해당 수의 약수가 있다는 뜻이므로, 해당 수의 약수를 순회할 때 이미 제외됨
  if (isPrime[i]) {
    // 3. 왜 i * 2가 아니라 i * i인가?
    // - 이미 제거된 수에 대한 중복 제거
    // - e.g. i보다 작은 수에 대해서는 이미 이전에 진행 => 5 * 4, 5 * 3 ...은 이미 이전 i에서 수행
    for (let j = i * i; j <= limit; j += i) {
      isPrime[j] = false; // i의 배수는 소수가 아님
    }
  }
}

for (let i = 2; i <= limit; i++) {
  if (isPrime[i]) {
    primes.push(i);
  }
}

// 소인수분해
for (let i = 0; i < numbers.length; i++) {
  let curr = numbers[i];
  for (const prime of primes) {
    if (prime > curr) {
      break;
    }
    while (true) {
      if (curr % prime) {
        break;
      } else {
        curr /= prime;
        divides[i][prime] ? divides[i][prime]++ : (divides[i][prime] = 1);
      }
    }
  }
}

// 모든 수의 소인수분해의 합을 구함
// - 모든 수를 곱한 수를 소인수분해 한 결과와 같음
const sums = {};

for (const divide of divides) {
  for ([k, v] of Object.entries(divide)) {
    if (sums[k]) {
      sums[k] += v;
    } else {
      sums[k] = v;
    }
  }
}

let GCD = [1, {}];

// n개의 수가 나눠가질 수 있는 GCD
for ([k, v] of Object.entries(sums)) {
  const quotinent = Math.floor(v / n);
  GCD[0] *= Math.pow(k, quotinent);
  GCD[1][k] = quotinent;
}

const result = {};
const GCDEntries = Object.entries(GCD[1]);

// GCD를 만들기 위해 남는 것이나 필요한 것을 세는 로직
// - 어떤 수에서는 받아야 하고, 어떤 수에서는 줘야 함
// - 일단 필요없는 값을 모두 주고, 필요한 값을 모두 받는다고 가정
// - 마지막 result의 값은 움직이지 않아도 될 경우의 수
// - result의 결과가 남아있다면, 움직이지 않아도 되었을 경우 => count에서 제거
// - result의 결과가 없다면, 필요한만큼 움직였다는 뜻
for (const divide of divides) {
  for (const [k, v] of GCDEntries) {
    // GCD의 배수로 만들기 위해 움직인 횟수: 현재 수량 - 최소 수량
    const diff = (divide[k] ? divide[k] : 0) - v;
    if (result[k]) {
      result[k] += diff;
    } else {
      result[k] = diff;
    }
    count += Math.abs(diff);
  }
}

const over = Object.entries(result).reduce((acc, curr) => acc + curr[1], 0);

console.log(GCD[0], (count - over) / 2);
