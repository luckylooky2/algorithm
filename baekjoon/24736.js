// Football Scoring : 수학
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [home, away] = input;
const scores = [6, 3, 2, 1, 2];
const reduceFn = (acc, cur, idx) => acc + cur * scores[idx];
console.log([home.reduce(reduceFn, 0), away.reduce(reduceFn, 0)].join(" "));
