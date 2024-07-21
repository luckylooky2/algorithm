// 공주님의 정원 : 그리디, 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const blooming = input
  .map(([a, b, c, d]) => [a * 100 + b, c * 100 + d])
  .sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    } else {
      return a[0] - b[0];
    }
  });

let start = 301;
const endDay = 1201;
let index = 0;
let max = 0;
let answer = 0;

while (start < endDay) {
  let isFinded = false;

  for (let i = index; i < n; i++) {
    if (blooming[i][0] > start) {
      break;
    }
    if (max < blooming[i][1]) {
      isFinded = true;
      max = blooming[i][1];
      index = i + 1;
    }
  }

  if (isFinded) {
    start = max;
    answer++;
  } else {
    break;
  }
}

console.log(max < endDay ? 0 : answer);

// https://maivve.tistory.com/324
