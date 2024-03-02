// 대표 선수 : 투 포인터, 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, m] = input.shift();
const classes = input.map((v) => v.sort((a, b) => a - b));
const indexes = new Array(n).fill(0);
let answer = Infinity;

while (true) {
  let min = Infinity;
  let max = -Infinity;
  let minIndex = 0;

  for (let i = 0; i < n; i++) {
    if (min > classes[i][indexes[i]]) {
      min = classes[i][indexes[i]];
      minIndex = i;
    }
    if (max < classes[i][indexes[i]]) {
      max = classes[i][indexes[i]];
    }
  }
  answer = Math.min(answer, max - min);
  indexes[minIndex]++;
  if (indexes[minIndex] === m) {
    break;
  }
}

console.log(answer);

// 1. backtracking : 1000000C1000 => 시간 초과
// 2. two pointer : 원래 생각한 방법, js로 하면 시간 초과 발생(why?)
