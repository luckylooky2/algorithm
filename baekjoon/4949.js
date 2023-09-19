// 균형잡힌 세상 : 스택, 문자열
const strList = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n")
  .map((v) => v.split(""));
const answer = [];

strList.map((v) => {
  if (v[0] === "." || v[0] === undefined) return;
  const stack = [];
  let flag = false;
  let i = 0;
  while (i !== v.length) {
    if (v[i] === "(" || v[i] === "[") stack.push(v[i]);
    else if (v[i] === ")" || v[i] === "]") {
      if (
        (v[i] === ")" && stack[stack.length - 1] === "(") ||
        (v[i] === "]" && stack[stack.length - 1] === "[")
      )
        stack.pop();
      else {
        flag = true;
        break;
      }
    }
    i++;
  }
  if (flag || stack.length !== 0) answer.push("no");
  else answer.push("yes");
});

console.log(answer.join("\n"));
