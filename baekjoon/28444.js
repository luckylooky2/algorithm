// HI-ARC=? : 수학
const [h, i, a, r, c] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split(" ")
  .map((v) => +v);
console.log(h * i - a * r * c);
