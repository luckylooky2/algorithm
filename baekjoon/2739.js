// 구구단 : 수학
const number = require("fs").readFileSync(0, "utf-8").toString().trim();
const arr = Array.from({ length: 9 }).map((_v, i) => i + 1);

console.log(arr.map((v) => `${number} * ${v} = ${number * v}`).join("\n"));
