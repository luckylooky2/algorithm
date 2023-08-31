// 구간 합 구하기 5 : 동적 계획법, 누적 합
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, m] = arr.shift();
const [xSum, ySum] = new Array(2)
  .fill(null)
  .map(() => new Array(n).fill(null).map(() => new Array(n).fill(0)));
const answer = [];

const map = [];
for (let i = 0; i < n; i++) map.push(arr.shift());

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    xSum[i][j] = map[i][j] + (j > 0 ? xSum[i][j - 1] : 0);
    ySum[i][j] = map[i][j] + (i > 0 ? ySum[i - 1][j] : 0);
  }
}

arr.forEach((v) => {
  const [x1, y1, x2, y2] = v;
  const numX = x2 - x1 + 1;
  const numY = y2 - y1 + 1;
  let total = 0;
  if (numX <= numY) {
    for (let i = x1; i <= x2; i++)
      total += xSum[i - 1][y2 - 1] - (y1 === 1 ? 0 : xSum[i - 1][y1 - 1 - 1]);
  } else {
    for (let i = y1; i <= y2; i++)
      total += ySum[x2 - 1][i - 1] - (x1 === 1 ? 0 : ySum[x1 - 1 - 1][i - 1]);
  }
  answer.push(total);
});

console.log(answer.join("\n"));
