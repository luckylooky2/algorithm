// Arno's Sleep Schedule : 수학
const [start, end] = require("fs").readFileSync(0, "utf-8").trim().split("\n").map(Number);
console.log((end - start + 24) % 24);
