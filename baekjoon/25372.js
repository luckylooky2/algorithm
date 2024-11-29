// 성택이의 은밀한 비밀번호 : 구현, 문자열
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const n = +input.shift();
const answer = [];

for (const str of input) {
  answer.push(str.length >= 6 && str.length <= 9 ? "yes" : "no");
}

console.log(answer.join("\n"));
