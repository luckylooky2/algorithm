// Cupcake Party : 수학
const [regular, small] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => +v);
const students = 28;

console.log(regular * 8 + small * 3 - students);
