// 수 고르기
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v, 10));
const arr = input.map((v) => parseInt(v, 10)).sort((a, b) => a - b);
let answer = arr.length === 1 ? 0 : Infinity;

// target을 만족하는 가장 작은 low index를 구함
function lowerBound(arr, target) {
  let low = 0;
  let high = arr.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] < target) low = mid + 1;
    else high = mid;
  }

  return low;
}
for (value of arr) {
  const res = lowerBound(arr, value + m);
  if (res != n) answer = Math.min(answer, Math.abs(arr[res] - value));
}

console.log(answer);
