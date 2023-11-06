// 회의실 배정 : 그리디
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = arr.shift();
const sorted = arr.sort((a, b) => {
  if (a[0] !== b[0]) return a[0] - b[0];
  else return a[1] - b[1];
});
let left = -Infinity,
  right = Infinity;
let answer = 1;

sorted.map((v) => {
  if (right <= v[0]) {
    answer++;
    left = v[0];
    right = v[1];
  } else {
    left = Math.max(v[0], left);
    right = Math.min(v[1], right);
  }
});

console.log(answer);
