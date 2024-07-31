// 평균은 넘겠지 : 수학
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [caseNum] = input.shift();
const testCases = input;
const answer = [];

for (const [studentNum, ...scores] of testCases) {
  const total = scores.reduce((acc, curr) => acc + curr, 0);
  const avg = total / studentNum;
  const overAvg = scores.filter((v) => v > avg).length;
  answer.push(Math.round((overAvg / studentNum) * 100 * 1000));
}

console.log(answer.map((v) => `${v / 1000}%`).join("\n"));
