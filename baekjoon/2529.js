// 부등호 : 백트래킹, 브루트 포스
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const [n] = input.shift().map((v) => parseInt(v, 10));
const signs = input.shift();
const arr = [];
const answer = [];

function checkBigSmall(curr, depth) {
  const top = arr[arr.length - 1];
  if (signs[depth - 1] === "<") {
    return top < curr;
  } else {
    return top > curr;
  }
}

function recur(depth) {
  if (depth === n + 1) {
    answer.push(arr.join(""));
    return;
  }

  for (let i = 0; i <= 9; i++) {
    if (depth > 0 && (arr.includes(i) || !checkBigSmall(i, depth))) {
      continue;
    }
    arr.push(i);
    recur(depth + 1);
    arr.pop();
  }
}

recur(0);

console.log(answer[answer.length - 1]);
console.log(answer[0]);
