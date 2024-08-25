// 검증수 : 수학
const arr = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split(" ")
  .map((v) => Number(v));
console.log(arr.reduce((acc, curr) => acc + Math.pow(curr, 2), 0) % 10);
