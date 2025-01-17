// Correct : 수학
const [hour, minute] = require("fs").readFileSync(0, "utf-8").trim().split(" ").map(Number);
console.log((hour - 9) * 60 + minute);
