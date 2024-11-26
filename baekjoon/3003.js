// 킹, 퀸, 룩, 비숍, 나이트, 폰 : 구현
const arr = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split(" ")
  .map((v) => +v);
const target = [1, 1, 2, 2, 2, 8];
const answer = [];

for (let i = 0; i < arr.length; i++) {
  answer.push(target[i] - arr[i]);
}

console.log(answer.join(" "));
