// 난로 : 정렬, 그리디
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const [n, k] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const arr = input.map((v) => +v);
let answer = arr[arr.length - 1] - arr[0] + 1;
const diffs = [];

for (let i = 0; i < arr.length - 1; i++) {
  diffs.push(arr[i + 1] - arr[i]);
}

const sorted = diffs.sort((a, b) => b - a);

for (let i = 0; i < k - 1; i++) {
  answer -= sorted[i] - 1;
}

console.log(answer);
