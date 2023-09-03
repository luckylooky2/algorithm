// 스택 수열 : 스택
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => parseInt(v, 10));
const n = arr.shift();
const stack = [];
const answer = [];

let count = 0;

for (let i = 1; i <= n; i++) {
  stack.push(i);
  answer.push("+");
  while (stack.length && stack[stack.length - 1] === arr[count]) {
    stack.pop();
    answer.push("-");
    count++;
  }
}

console.log(stack.length ? "NO" : answer.join("\n"));
