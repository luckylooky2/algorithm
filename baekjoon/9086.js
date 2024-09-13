// 문자열 : 문자열
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const n = +input.shift();
const strings = input;
const answer = [];

for (string of strings) {
  answer.push([string[0], string[string.length - 1]].join(""));
}

console.log(answer.join("\n"));
