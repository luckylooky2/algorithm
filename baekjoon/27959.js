// 초코바 : 수학
const [n, m] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split(" ")
  .map((v) => +v);
console.log(100 * n >= m ? "Yes" : "No");
