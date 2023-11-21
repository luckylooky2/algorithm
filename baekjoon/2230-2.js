const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v, 10));
const arr = input.map((v) => parseInt(v, 10)).sort((a, b) => a - b);
let answer = arr.length === 1 ? 0 : Infinity;

function check(mid, value) {
  const diff = Math.abs(arr[mid] - value);
  if (diff >= m) {
    answer = Math.min(answer, diff);
    return true;
  }
  return false;
}

for (value of arr) {
  let s = 0,
    e = arr.length - 1;
  while (s <= e) {
    const mid = Math.ceil((s + e) / 2);
    if (check(mid, value)) {
      s = mid;
    } else {
      e = mid - 1;
    }
  }
}
console.log(answer);
