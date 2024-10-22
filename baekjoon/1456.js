// 거의 소수 : 에라토스테네스의 체, 소수, 수학
const [start, end] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split(" ")
  .map((v) => +v);
const primes = [];
const isPrime = new Array(10000001).fill(true);

for (let i = 2; i <= 10000000; i++) {
  if (!isPrime[i]) {
    continue;
  } else {
    primes.push(i);
  }
  for (let j = i; j * i <= 10000000; j++) {
    isPrime[j * i] = false;
  }
}

let answer = 0;

for (const prime of primes) {
  if (Math.pow(prime, 2) > end) {
    continue;
  }

  let num = prime * prime;
  while (true) {
    if (start <= num && num <= end) {
      answer++;
      // 오버플로우 가능성을 생각하지 못했음 => bigint
    } else if (num > end) {
      break;
    }
    num *= prime;
  }
}

console.log(answer);
