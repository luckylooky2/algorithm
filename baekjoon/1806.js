// 부분합 : 투 포인터
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, s] = input.shift();
const arr = input.shift();
let left = 0,
  right = 0;
let total = arr[left];
let answer = Infinity;

// arr[left] === s인 경우는 1로 최소값이 되므로 탐색을 종료해도 됨(left <= right)
while (left <= right) {
  if (total >= s) answer = Math.min(answer, right - left + 1);
  if (right <= n - 1 && total < s) total += arr[++right];
  else total -= arr[left++];
}

console.log(answer === Infinity ? 0 : answer);

// while (left < n - 1 || right < n - 1) 로 하면 안 되는 이유?
// n - 1을 포함하지 않으므로 제일 마지막에 s가 있는 경우 포함하지 못하므로
