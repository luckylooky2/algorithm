const fs = require("fs");
const lst = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v, 10));

let x, y;
let ret_x, ret_y;

for (x = -999; x < 1000; x++) {
  for (y = -999; y < 1000; y++) {
    if (
      lst[0] * x + lst[1] * y === lst[2] &&
      lst[3] * x + lst[4] * y === lst[5]
    ) {
      ret_x = x;
      ret_y = y;
    }
  }
}

console.log(ret_x, ret_y);
