// Loteria Falha : 수학
const arr = require("fs")
  .readFileSync(0, "utf-8")
  .split("\n")
  .map((v) => BigInt(v))
  .slice(0, -2);
const answer = arr.map((num) => (num % 42n === 0n ? "PREMIADO" : "TENTE NOVAMENTE"));
console.log(answer.join("\n"));
