const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const [n] = input.shift();
const [arr] = input;

arr.sort((a, b) => a - b);

let total = 0;
for (let i = 0; i < arr.length; i++) {
  if (arr[0] !== 1) break;
  total += arr[i];
  if (total + 1 < arr[i + 1]) break;
}

console.log(total + 1);
