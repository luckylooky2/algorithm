// 서울에서 경산까지
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [cityCnt, maxMinute] = input.shift();
const [WALK, RIDE] = [0, 1];
// table[cityIndex][WALK | RIDE]
const table = input.map(([a, b, c, d]) => [
  [a, b],
  [c, d],
]);
const dp = new Array(cityCnt + 1)
  .fill(null)
  .map(() => new Array(maxMinute + 1).fill(null));
