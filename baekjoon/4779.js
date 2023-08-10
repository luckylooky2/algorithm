// 칸토어 집합 : 분할 정복
const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => parseInt(v, 10));

const final = [];

function recur(n, string, i = 0) {
  if (i === 1) return string + " ".repeat(n);
  if (n === 1) return string + "-";

  for (let i = 0; i < 3; i++) {
    string = recur(n / 3, string, i);
  }
  return string;
}

input.forEach((element) => {
  let result = "";
  const n = Math.pow(3, element);
  result = recur(n, result);
  final.push(result);
});

console.log(final.join("\n"));
