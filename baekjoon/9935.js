// 문자열 폭발 : 스택, 문자열
const [findFrom, findTo] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(""));
const answer = [];
const length = findTo.length - 1;

function check(i) {
  let j = 0;
  if (i < length) return false;
  while (j <= length) {
    if (answer[i - j] !== findTo[length - j]) return false;
    j++;
  }
  return true;
}

for (let i = 0; i < findFrom.length; i++) {
  answer.push(findFrom[i]);
  if (answer[answer.length - 1] === findTo[findTo.length - 1])
    if (check(answer.length - 1))
      for (let i = 0; i <= length; i++) answer.pop();
}

console.log(answer.length === 0 ? "FRULA" : answer.join(""));
