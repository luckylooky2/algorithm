// Julka : 수학
const [total, over] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => BigInt(v));
console.log([(total - over) / 2n + over, (total - over) / 2n].join("\n"));
