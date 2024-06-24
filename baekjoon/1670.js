// 정상 회담 2 : 동적 계획법
const n = Number(require("fs").readFileSync("/dev/stdin").toString().trim());
const dp = { 0: 1, 2: 1, 4: 2 };

function modulo(num1, num2) {
  const quotinent = BigInt(num1 / num2);
  return num1 - num2 * quotinent;
}

for (let i = 6; i <= n; i += 2) {
  let j = 2;
  let answer = 0;
  while (j <= i / 2) {
    const left = j - 2;
    const right = i - j;
    const multiply = BigInt(dp[left]) * BigInt(dp[right]);
    const remainder = modulo(multiply, BigInt(987654321));
    answer += Number(remainder) * 2;
    answer %= 987654321;
    j += 2;
  }
  if ((i / 2) % 2) {
    const left = j - 2;
    const right = i - j;
    const multiply = BigInt(dp[left]) * BigInt(dp[right]);
    const remainder = modulo(multiply, BigInt(987654321));
    answer += Number(remainder);
    answer %= 987654321;
    j += 2;
  }
  dp[i] = answer;
}

console.log(dp[n]);

// 2
// 12

// 4
// 12, 34 / 14, 23

// 1 1

// 6
// 12, 34, 56
// 12, 36, 45 // 2
// 14, 23, 56 // 1
// 16, 23, 45
// 16, 25, 34 // 2

// 2 1 2

// 8
// 12, 34, 56, 78
// 12, 34, 58, 67
// 12, 36, 45, 78
// 12, 36, 58, 67 // 5
// 14, 23, 56, 78
// 14, 23, 58, 67 // 2
// 16, 78, 34, 56
// 16, 78, 23, 45 // 2
// 18 // 5개
