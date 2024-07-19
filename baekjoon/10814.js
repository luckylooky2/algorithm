// 나이순 정렬 : 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const [n] = input.shift();
const members = input.map(([age, number], i) => [Number(age), number, i]);
const sorted = members.sort((a, b) => {
  if (a[0] !== b[0]) {
    return a[0] - b[0];
  } else {
    return a[2] - b[2];
  }
});

console.log(sorted.map((v) => v.slice(0, 2).join(" ")).join("\n"));
