// 果物 (Fruit) : 수학
const [lingo, mikan] = require("fs").readFileSync(0, "utf-8").split("\n").map(Number);
const banana = 3;
console.log(lingo + mikan + banana);
