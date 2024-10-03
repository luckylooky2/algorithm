// 골드바흐의 추측 : 소수, 에라토스테네스의 체
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => +v);
const n = input.shift();
const numbers = input;
const answer = [];
const target = 10000;
const isPrime = new Array(target + 1).fill(true);
const primes = [];

for (let i = 2; i <= Math.sqrt(target); i++) {
  if (isPrime[i] === false) {
    continue;
  }
  // 2 * 2, 3 * 3 부터 시작
  for (let j = i; j * i <= target; j++) {
    isPrime[j * i] = false;
  }
}

for (let i = 2; i <= target; i++) {
  if (isPrime[i]) {
    primes.push(i);
  }
}

for (const n of numbers) {
  let result = [0, 0];
  for (const p of primes) {
    if (Math.floor(n / 2) < p) {
      break;
    }
    const diff = n - p;
    if (isPrime[diff]) {
      result = [p, diff];
    }
  }
  answer.push(result);
}

console.log(answer.map((v) => v.join(" ")).join("\n"));
