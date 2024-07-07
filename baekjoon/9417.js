// 최대 GCD : 수학, 유클리드 호제법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const answer = [];

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

for (const set of input) {
  let gcd = 0;
  for (let i = 0; i < set.length; i++) {
    for (let j = i + 1; j < set.length; j++) {
      gcd = Math.max(gcd, GCD(set[i], set[j]));
    }
  }
  answer.push(gcd);
}

console.log(answer.join("\n"));
