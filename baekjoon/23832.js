// 서로소 그래프 : 수학, 정수론, 오일러 피 함수
const n = +require("fs").readFileSync(0, "utf-8").trim();
const dp = new Array(n + 1).fill(0);
dp[2] = 1;
const isPrime = new Array(50001).fill(true);
const prime = new Set();
const under = new Array(50001).fill(0);

for (let i = 2; i <= 50001; i++) {
  for (let j = i * i; j <= 50001; j += i) {
    isPrime[j] = false;
  }
}
// 2, 3, 5, 7, 11, 13
let count = 0;
for (let i = 2; i <= 50001; i++) {
  if (isPrime[i]) {
    prime.add(i);
    count++;
  }
  under[i] = count;
}

// O(n^2): 시간 초과
function calc(number) {
  const candidates = [];
  if (isPrime[number]) {
    return number - 1;
  }
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      if (prime.has(i)) {
        candidates.push(i);
      }
      if (number / i !== i && prime.has(number / i)) {
        candidates.push(number / i);
      }
    }
  }
  let count = number;
  for (const candidate of candidates) {
    count *= 1 - 1 / candidate;
  }
  return Math.round(count);
  // n - 2개 중에
  //   console.log(number, under[number], candidates, under[number] + 1 - candidates.length);
  //   console.log(number, "count", candidates, count);
  //   return number - 1 - (under[number] + 1 - candidates.length);
}

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + calc(i);
}

console.log(dp[n]);

// 2 = 0 + 1 - 0 = 1										1
// 3 = 1 + 2 - 0 = 3 () / (1, 2)							2
// 4 = 3 + 3 - 1 = 5 (2) / (1, 3) + 2						2
// 5 = 5 + 4 - 0 = 9 () / (1, 2, 3, 4)						4
// 6 = 9 + 5 - 3 = 11 (2, 3, 4) / (1, 5) + 2				2
// 7 = 11 + 6 - 0 = 17 () / (1, 2, 3, 4, 5, 6)				6
// 8 = 17 + 7 - 3 = 21 (2, 4, 6) / (1, 3, 5, 7) + 4			4
// 9 = 21 + 8 - 2 = 27 (3, 6) / (1, 2, 4, 5, 7, 8) + 2		6
// 10 = 27 + 9 - 5 = 31 (2, 4, 5, 6, 8) / (1, 3, 5, 7) + 4	4
// 11 = 31 + 10 - 0 = 41									10
// 12 = 41 + 11 - 7 = 45 + 4								4
// 13 = 45 + 12 - 0 = 57									12
// 14 = 57 + 13 - 7 = 63 + 6								6
// 15 = 63 + 14 - 6 = 71 + 8								8

// 2, 4, 6, 8, 10, 12, 7
// 3, 6, 9, 12, 5, 10

// 일반 항

// 2, 3, 4, 6, 8, 9, 10
// 1, 5, 7, 11

// 2, 3, 4, 6
