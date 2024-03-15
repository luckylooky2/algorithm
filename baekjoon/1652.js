// 누울 자리를 찾아라 : 문자열
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = Number(input.shift());
const map = input.map((v) => v.split(""));
let [h, v] = [0, 0];

for (let i = 0; i < n; i++) {
  let countH = 0;
  let countV = 0;
  for (let j = 0; j < n; j++) {
    if (map[i][j] === ".") {
      countH++;
    }
    if (map[i][j] === "X" || j === n - 1) {
      if (countH >= 2) {
        h++;
      }
      countH = 0;
    }
    if (map[j][i] === ".") {
      countV++;
    }
    if (map[j][i] === "X" || j === n - 1) {
      if (countV >= 2) {
        v++;
      }
      countV = 0;
    }
  }
}

console.log([h, v].join(" "));

// 19'30" / 30'00"
