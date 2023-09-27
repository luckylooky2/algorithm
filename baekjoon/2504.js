// 괄호의 값 : 스택

const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("");
const stack = [];
const result = [];
let i = 0;
const LP = "(",
  RP = ")",
  LB = "[",
  RB = "]";
let flag = false;

while (i !== arr.length) {
  stack.push(arr[i]);
  if (stack[stack.length - 1] === RP) {
    const second = stack.pop();
    const first = stack.pop();
    if (first === LP) {
      result.push(2);
    } else {
      flag = true;
      break;
    }
    if (arr[i + 1] === LP || arr[i + 1] === LB) result.push("+");
    if (arr[i + 1] === RP || arr[i + 1] === RB) result.push("x");
  } else if (stack[stack.length - 1] === RB) {
    const second = stack.pop();
    const first = stack.pop();
    if (first === LB) {
      result.push(3);
    } else {
      flag = true;
      break;
    }
    if (arr[i + 1] === LP || arr[i + 1] === LB) result.push("+");
    if (arr[i + 1] === RP || arr[i + 1] === RB) result.push("x");
  }
  console.log(stack);
  i++;
}

// console.log(flag ? 0 : result);
console.log(result);
