// 괄호의 값 : 스택
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("");
const stack = [];
const result = [];
let i = 0;
let base = 1;
let flag = false;

while (i !== arr.length) {
  stack.push(arr[i]);
  const top = stack[stack.length - 1];
  if (top === "(" || top === "[") base *= top === "(" ? 2 : 3;
  if (top === ")" || top === "]") {
    const second = stack.pop();
    const first = stack.pop();
    if (
      (first === "(" && second === ")") ||
      (first === "[" && second === "]")
    ) {
      if (
        (!stack.length ||
          stack[stack.length - 1] === "(" ||
          stack[stack.length - 1] === "[") &&
        !(arr[i - 1] === ")" || arr[i - 1] === "]")
      )
        result.push(base);
      base /= first === "(" ? 2 : 3;
    } else {
      flag = true;
      break;
    }
  }
  i++;
}

console.log(
  flag || result.length === 0 || stack.length !== 0
    ? 0
    : result.reduce((a, b) => a + b)
);
