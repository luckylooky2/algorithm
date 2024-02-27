// 대표 선수
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const sortFunction = (a, b) => a[0] - b[0];
const [n, m] = input.shift();
const classes = input.map((v) => v.slice().sort((a, b) => a - b));
const indexes = new Array(n).fill(0);
let answer = Infinity;
const selected = [];
let start = 0,
  end = n - 1;

for (let i = 0; i < n; i++) {
  selected.push([classes[i][indexes[i]], i]);
}
selected.sort(sortFunction);
answer =
  selected.length === 1
    ? selected.at(0)[0]
    : Math.min(answer, Math.abs(selected.at(n - 1)[0] - selected.at(0)[0]));
indexes[selected.at(0)[1]]++;

while (indexes[selected.at(0)[1]] !== m) {
  const [_value, index] = selected.shift();
  selected.push([classes[index][indexes[index]], index]);
  selected.sort(sortFunction);
  answer = Math.min(
    answer,
    Math.abs(selected.at(n - 1)[0] - selected.at(0)[0])
  );
  if (answer === 0) {
    break;
  }
  indexes[selected.at(0)[1]]++;
  if (indexes[selected.at(0)[1]] === m) {
    break;
  }
}

console.log(answer);
