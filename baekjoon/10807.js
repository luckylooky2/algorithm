// 개수 세기 : 구현
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const arr = input.shift();
const [v] = input.shift();

console.log(arr.filter((value) => value === v).length);
