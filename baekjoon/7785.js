// 회사에 있는 사람
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const [n] = arr.shift();
const log = {};

for ([name, event] of arr) {
  if (event === "enter") log[name] = true;
  else log[name] = false;
}

// string 정렬은 콜백 함수가 필요하지 않음
console.log(
  Object.entries(log)
    .filter(([key, value]) => value === true)
    .map((v) => v[0])
    .sort()
    .reverse()
    .join("\n")
);
