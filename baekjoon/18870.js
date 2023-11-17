// 좌표 압축 : 정렬, 이분 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const arr = input.shift();
const sorted = arr.map((v) => v).sort((a, b) => a - b);
const answer = [];
const cache = {};
let prev = Infinity;
let cnt = 0;
sorted.forEach((element, index) => {
  if (element !== prev) {
    prev = element;
    cache[element] = index - cnt;
  } else cnt++; // 중복 제거
});

// 여기서는 object를 이용하여 인덱스를 편하게 구하고 저장
// 이분 탐색을 이용해 인덱스를 구하는 방법도 존재
arr.forEach((element) => {
  answer.push(cache[element]);
});

console.log(answer.join(" "));
