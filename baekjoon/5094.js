const fs = require("fs");
const n = parseInt(fs.readFileSync("/dev/stdin").toString().trim(), 10);

const cache = { 0: 3 };
let i = 0;

while (cache[i] < n) {
  i++;
  cache[i] = cache[i - 1] * 2 + (i + 3);
}

function recur(i, n) {
  if (n <= 3) return console.log(n === 1 ? "m" : "o");
  // 중간과 오른쪽을 나누는 기준
  const div = cache[i] + i + 4;
  // 왼쪽
  if (n <= cache[i]) return recur(i - 1, n);
  // 중간
  else if (n <= div) return console.log(cache[i] + 1 === n ? "m" : "o");
  // 오른쪽
  else return recur(i - 1, n - div);
}

recur(i - 1, n);
