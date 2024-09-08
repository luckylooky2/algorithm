// 이상한 기호 : 수학
const [n, m] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split(" ")
  .map((v) => +v);
console.log(Math.pow(n, 2) - Math.pow(m, 2));
