// 소수 구하기 : 수학, 소수
const [m, n] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v, 10));
const answer = [];

// 일반적인 방법
// for (let i = m; i <= n; i++) {
//   let flag = false;
//   for (let j = 2; j * j <= i; j++) {
//     if (i % j === 0) {
//       flag = true;
//       break;
//     }
//   }
//   if (i !== 1 && !flag) answer.push(i);
// }

// console.log(answer.join("\n"));

// 에라토스테네스의 체
const check = new Array(n + 1).fill(false);
check[0] = true;
check[1] = true;

for (let i = 2; i <= n; i++) {
  if (check[i]) continue;
  else {
    j = i;
    while (i * j <= n) {
      check[i * j] = true;
      j++;
    }
  }
}

check.filter((v, i) => {
  if (i >= m && v === false) answer.push(i);
});

console.log(answer.join("\n"));
