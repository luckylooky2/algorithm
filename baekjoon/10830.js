const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, b] = input[0].split(" ").map((v) => parseInt(v, 10));
const arr = input
  .filter((v, i) => i !== 0)
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const cache = {};

function multiply(mat1, mat2) {
  const tmp = arr.map((v) => v.map((v) => 0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let res = 0;
      for (let k = 0; k < n; k++) {
        res += mat1[i][k] * mat2[k][j];
      }
      tmp[i][j] = res % 10000;
    }
  }
  return tmp;
}

function recur(b) {
  if (b === 1) {
    return arr;
  }

  if (b === 2) {
    return multiply(arr, arr);
  }

  let m1, m2;
  const first = Math.floor(b / 2);
  const second = first + (b % 2);

  m1 = recur(first);

  if (!cache[first]) cache[first] = m1;

  if (first === second) m2 = cache[first];
  else m2 = multiply(cache[first], arr);
  if (!cache[second]) cache[second] = m2;
  return multiply(m1, m2);
}

const final = recur(b);

console.log(final.map((v) => v.map((v) => v % 1000).join(" ")).join("\n"));
