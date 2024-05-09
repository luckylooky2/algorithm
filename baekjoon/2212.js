// 센서 : 그리디, 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = Number(input[0]);
const k = Number(input[1]);
const coord = input[2]
  .split(" ")
  .map((v) => Number(v))
  .sort((a, b) => a - b);
const diff = [];
let answer = 0;

for (let i = 0; i < n - 1; i++) {
  const [f, s] = [coord[i], coord[i + 1]];
  diff.push([Math.abs(s - f), [i, i + 1]]);
}

const sorted = diff.sort((a, b) => b[0] - a[0]);
const splitIndex = sorted
  .slice(0, k - 1)
  .map((v) => v[1][0])
  .sort((a, b) => a - b);

let start = 0;
let idx = 0;
let count = 0;
for (let i = 0; i < n; i++) {
  if (count < k - 1 && i === splitIndex[idx]) {
    answer += Math.abs(coord[splitIndex[idx]] - coord[start]);
    idx++;
    count++;
    start = i + 1;
  }
}
answer += Math.abs(coord[n - 1] - coord[start]);

console.log(answer);
