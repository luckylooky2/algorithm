// AxB : 구현
const [a, b] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split(" ")
  .map((v) => +v);

console.log(a * b);
