// 소인수분해 : 수학, 소인수분해
let n = parseInt(
  require("fs").readFileSync("/dev/stdin").toString().trim(),
  10
);
const answer = [];
let i = 2;

while (i * i <= n) {
  if (n % i === 0) {
    while (n % i === 0) {
      console.log(i);
      n /= i;
    }
  }
  i++;
}

if (n !== 1) console.log(n);
