// 큰 수 곱셈 : 수학
const [num1, num2] = require("fs")
  .readFileSync(0, "utf-8")
  .split(" ")
  .map((v) => BigInt(v));
console.log(String(num1 * num2));
