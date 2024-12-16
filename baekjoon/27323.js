// 직사각형 : 수학
const [a, b] = require("fs").readFileSync(0, "utf-8").trim().split("\n").map((v) => +v);
console.log(a * b);