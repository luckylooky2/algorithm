// 分 (Minutes) : 수학
const [hours, minutes] = require("fs").readFileSync(0, "utf-8").split("\n").map(Number);
console.log(hours * 60 + minutes);
