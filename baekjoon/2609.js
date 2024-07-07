// 최대공약수와 최소공배수 : 수학, 유클리드 호제법
const [n, m] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ");

function GCD(a, b) {
  let big, small;
  if (a > b) {
    big = a;
    small = b;
  } else {
    big = b;
    small = a;
  }

  const remainder = big % small;
  if (remainder === 0) {
    return small;
  }

  return GCD(small, remainder);
}

console.log(GCD(n, m));
console.log((n * m) / GCD(n, m));
