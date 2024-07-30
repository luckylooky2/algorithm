// 서울 지하철 2호선
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const edges = input.map(([a, b]) => {
  if (a < b) {
    return [a, b];
  } else {
    return [b, a];
  }
});
const next = new Array(n).fill(null).map(() => new Array(0));
const count = new Array(n + 1).fill(0);

for (const [a, b] of edges) {
  next[a].push(b);
  next[b].push(a);
}

console.log(next);

// 순환 구간을 어떻게 판단?
