const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = parseInt(input[0], 10);
const arr = input.map((v) => v.split("")).filter((v, i) => i !== 0);
let final = "";

function check(headX, headY, n) {
  let white = 0,
    black = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[headX + i][headY + j] === "0") white++;
      else if (arr[headX + i][headY + j] === "1") black++;
    }
  }
  if (black === 0) return "0";
  else if (white === 0) return "1";
  else return "2";
}

function divide(n, x = 0, y = 0) {
  let half = n / 2;

  if (n === 2) {
    final += "(";
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++) final += arr[x + i][y + j];
    final += ")";
    return;
  }

  final += "(";
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const headX = x + i * half;
      const headY = y + j * half;
      const res = check(headX, headY, half);

      if (res === "0" || res === "1") final += res;
      else divide(n / 2, headX, headY);
    }
  }
  final += ")";
}

const first = check(0, 0, n);
if (first === "0" || first === "1") final += `${first}`;
else divide(n);

console.log(final);
