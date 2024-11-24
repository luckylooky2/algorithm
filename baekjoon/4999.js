// 아! : 구현, 문자열
const [str1, str2] = require("fs").readFileSync(0, "utf-8").trim().split("\n");
console.log(str1.length < str2.length ? "no" : "go");
