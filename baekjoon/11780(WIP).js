// 플로이드 2
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const [m] = input.shift();
const map = new Array(n).fill(null).map(() => new Array(n).fill(Infinity));

input.map(([start, end, cost]) => {
  if (map[start - 1][end - 1] > cost) map[start - 1][end - 1] = cost;
});

for (let i = 0; i < n; i++) map[i][i] = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) {
      const currVal = map[j][k];
      const newVal = map[j][i] + map[i][k];
      if (currVal > newVal) {
        map[j][k] = newVal;
      }
    }
  }
}

console.log(map);
