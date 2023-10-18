// 수 정렬하기 5 : 정렬
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => parseInt(v, 10));
const n = arr.shift();

function countingSort(arr) {
  const answer = [];
  const min = Math.min(...arr);
  const max = Math.max(...arr);

  const counts = new Array(max - min + 1).fill(0);
  arr.forEach((v) => counts[v - min]++);

  counts.forEach((v, i) => {
    for (let j = 0; j < v; j++) answer.push(i + min);
  });
  return answer;
}

console.log(countingSort(arr).join("\n"));
