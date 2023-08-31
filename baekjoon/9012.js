// 괄호 : 스택
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(""));

arr.forEach((v) => {
  const stack = [];
  let flag = 0;
  for (let i = 0; i < v.length; i++) {
    if (v[i] === "(") stack.push(v[i]);
    else if (v[i] === ")") {
      if (stack.length === 0) {
        flag = 1;
        break;
      }
      stack.pop();
    }
  }
  console.log(flag || stack.length !== 0 ? "NO" : "YES");
});
