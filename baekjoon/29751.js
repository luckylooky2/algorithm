// 삼각형 : 수학
const [w, h] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split(" ")
  .map((v) => +v);
console.log(((w * h) / 2).toFixed(1));
