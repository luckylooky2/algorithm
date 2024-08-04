// 엄청난 부자2 : 수학
const [n, m] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => BigInt(v));

function solve(n, m) {
  const quotinent = n / m;
  const remainder = n % m;
  return [String(quotinent), String(remainder)];
}

console.log(solve(n, m).join("\n"));
