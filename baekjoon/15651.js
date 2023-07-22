const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v, 10));
let n = input[0];
let r = input[1];
let arr = [];
let result = [];

function repetitionPermutation(s = 0, depth = 0) {
  result[depth] = s;

  if (depth === r) {
    arr.push(result.filter((v, i) => i !== 0).join(" "));
    return;
  }

  for (let i = 1; i <= n; i++) {
    repetitionPermutation(i, depth + 1);
  }
}

repetitionPermutation();

console.log(arr.join("\n"));
