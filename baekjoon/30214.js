// An Easy-Peasy Problem : 수학
const [a, b] = require("fs").readFileSync(0, "utf-8").trim().split(" ").map(Number);
console.log(a * 2 < b ? "H" : "E");
