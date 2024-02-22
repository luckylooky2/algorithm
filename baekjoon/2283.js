// 구간 자르기 : 투 포인터, 스위핑, 누적 합
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, k] = input.shift();
const lines = input;
let total = 0;
let smallest = 0,
  biggest = 0;
const start = {};
const end = {};
let p1 = 0,
  p2 = 0;

for (let [min, max] of lines) {
  if (start[min] === undefined) {
    start[min] = 1;
  } else {
    start[min]++;
  }
  if (end[max] === undefined) {
    end[max] = 1;
  } else {
    end[max]++;
  }
  smallest = Math.min(smallest, min);
  biggest = Math.max(biggest, max);
  total += max - min;
}
p1 = smallest;
p2 = smallest;

(function solve() {
  let lineSum = 0;
  let p1base = 0;
  let p2base = 0;
  while (p2 <= biggest) {
    // 합이 k보다 작으면 p2++, 합이 k보다 크면 p1--
    if (lineSum < k) {
      if (end[p2]) {
        p2base -= end[p2];
      }
      if (start[p2]) {
        p2base += start[p2];
      }
      lineSum += p2base;
      p2++;
    } else if (lineSum > k) {
      if (start[p1]) {
        p1base += start[p1];
      }
      if (end[p1]) {
        p1base -= end[p1];
      }
      lineSum -= p1base;
      p1++;
    } else {
      return console.log(`${p1} ${p2}`);
    }
  }
  console.log("0 0");
})();

// 시간 초과(브루트 포스) : 1,000,000^2 => 투 포인터로 해결

// 조건을 만족하는 A, B가 여러 개 존재할 때는 A가 가장 작은 경우를 출력하고, 그것도 여러 개 존재할 때는 B가 가장 작은 경우를 출력하는 경우에 투 포인터를 사용할 수 있는 이유는?
