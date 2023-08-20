// N과 M (4) : 백트래킹
const [n, m] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v, 10));

function recur(i, depth, result) {
  if (depth === m) return console.log(result.join(" "));

  for (let i = 1; i <= n; i++) {
    if (depth > 0 && i < result[depth - 1]) continue;
    result[depth] = i;
    recur(i, depth + 1, result);
  }
}

recur(0, 0, new Array(m).fill(0));
