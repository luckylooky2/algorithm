// Rats : 수학
const [n1, n2, n12] = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .split(" ")
  .map((v) => +v);

console.log(Math.floor(((n1 + 1) * (n2 + 1)) / (n12 + 1) - 1));
