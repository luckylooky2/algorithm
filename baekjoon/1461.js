// 도서관 : 정렬, 그리디
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [bookNum, maxCarry] = input.shift();
const booksCoord = input.shift().sort((a, b) => a - b);
const negative = booksCoord.filter((v) => v < 0);
const positive = booksCoord.filter((v) => v > 0).reverse();
const negativeGroup = splitGroup(negative);
const positiveGroup = splitGroup(positive);
let answer = 0;

function splitGroup(arr) {
  const group = [];
  let start = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i % maxCarry === maxCarry - 1) {
      group.push(arr.slice(start, i + 1));
      start = i + 1;
    }
  }

  if (arr.length !== start) {
    group.push(arr.slice(start, arr.length));
  }
  return group.reverse();
}

function solve(arr) {
  let answer = 0;
  let prev;
  for (let i = 0; i < arr.length; i++) {
    const curr = arr[i];
    // 끝이면 돌아올 필요 없음
    if (i !== 0) {
      answer += prev;
    }
    answer += Math.abs(curr.at(0));
    prev = Math.abs(curr.at(0));
  }
  return answer;
}

answer += solve(positiveGroup);
answer += solve(negativeGroup);
// add smaller end-point
if (positive.length && negative.length) {
  answer += Math.min(positive[0], Math.abs(negative[0]));
}
console.log(answer);
