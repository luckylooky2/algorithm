// 문자와 문자열 : 문자열, 구현
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const str = input[0];
const n = +input[1];

console.log(str[n - 1]);
