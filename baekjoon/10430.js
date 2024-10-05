// 나머지 : 수학
const [a, b, c] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split(" ")
  .map((v) => +v);

console.log((a + b) % c);
console.log(((a % c) + (b % c)) % c);
console.log((a * b) % c);
console.log(((a % c) * (b % c)) % c);

// 등식 성립
// (a + b) % c === ((a % c) + (b % c)) % c
// (a * b) % c === ((a % c) * (b % c)) % c
