// 행렬 곱셈 : 수학
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let i = 0;
const [n, m] = input[i++].split(" ").map((v) => Number(v));
const matrix1 = input
  .slice(i, i + n)
  .map((v) => v.split(" ").map((v) => Number(v)));
i += n;
const [_blank, k] = input[i++].split(" ").map((v) => Number(v));
const matrix2 = input
  .slice(i, i + m)
  .map((v) => v.split(" ").map((v) => Number(v)));

const res = new Array(n).fill(null).map(() => new Array(k).fill(0));

for (let i = 0; i < n; i++) {
  for (let j = 0; j < k; j++) {
    let sum = 0;
    for (let k = 0; k <= m - 1; k++) {
      sum += matrix1[i][k] * matrix2[k][j];
    }
    res[i][j] = sum;
  }
}

console.log(res.map((v) => v.join(" ")).join("\n"));
