// Contact : 정규 표현식
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = Number(input.shift());
const answer = [];

for (const elem of input) {
  const regex = /^(100+1+|01)+$/;
  answer.push(regex.test(elem) ? "YES" : "NO");
}

console.log(answer.join("\n"));

// ^, $ 표시가 없으면 어느 곳에서나 시작해도 되기 때문에 틀림
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet#assertions
