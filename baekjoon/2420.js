// 사파리 월드 : 수학
const [a, b] = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split(" ");

console.log(Math.abs(a - b));
