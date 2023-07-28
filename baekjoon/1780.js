const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = parseInt(input[0], 10);
const arr = input.map((v) => v.split(" ")).filter((v, i) => i !== 0);
const final = { "-1": 0, 0: 0, 1: 0 };

function check(n, headX, headY) {
  const tmp = { "-1": 0, 0: 0, 1: 0 };
  const full = n * n;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      tmp[arr[headX + i][headY + j]]++;
    }
  }
  if (tmp["-1"] === full) return "-1";
  else if (tmp[0] === full) return "0";
  else if (tmp[1] === full) return "1";
  else return "e";
}

function divide(n, x = 0, y = 0) {
  const distance = n / 3;

  if (n === 3) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        final[arr[x + i][y + j]]++;
      }
    }
    return;
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const headX = x + i * distance;
      const headY = y + j * distance;
      const res = check(distance, headX, headY);
      res !== "e" ? final[res]++ : divide(distance, headX, headY);
    }
  }
}

let res = check(n, 0, 0);
res !== "e" ? final[res]++ : divide(n);

console.log([final["-1"], final[0], final[1]].join("\n"));
