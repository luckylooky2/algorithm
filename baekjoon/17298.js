// 오큰수
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const arr = input.shift();
const answer = [];

const stack = [];
const reversed = arr.reverse();
reversed.map((v, i) => {
  if (!i) {
    stack.push(v);
    answer.push(-1);
  } else {
    // 현재 수보다 작을 때까지 pop
    // 거꾸로하면 더 로직이 간단함
    while (stack[stack.length - 1] <= v) stack.pop();
    answer.push(stack.length === 0 ? -1 : stack[stack.length - 1]);
    stack.push(v);
  }
});

console.log(answer.reverse().join(" "));
