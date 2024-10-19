// 身長 (Height) : 수학
const [h1, h2] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => +v);

console.log(h2 - h1);
