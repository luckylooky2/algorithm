// 시간 관리 : 정렬, 그리디
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const works = input.sort((a, b) => b[1] - a[1]);
let answer = Infinity;

for (const [hour, deadline] of works) {
  // answer이 deadline보다 크면, 빈 공간이 있다
  if (answer >= deadline) {
    answer = deadline - hour;
  } else {
    answer -= hour;
  }
}

console.log(Math.max(-1, answer));
