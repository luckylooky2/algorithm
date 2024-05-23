// 한국이 그리울 땐 서버에 접속하지 : 정규 표현식
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = Number(input.shift());
const strings = input;
const [start, end] = input.shift().split("*");
const regex = new RegExp(`^${start}[a-z]*${end}$`);
const answer = [];

for (const string of strings) {
  const res = regex.test(string);
  answer.push(res ? "DA" : "NE");
}

console.log(answer.join("\n"));

// 17'00"
