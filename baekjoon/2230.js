// 수 고르기 : 이분 탐색
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

// 하나의 현재 원소 elem을 기준으로 elem + m 보다 가장 작은 인덱스를 구함
// 있으면 해당 인덱스를 반환, 없으면 가장 마지막 인덱스를 반환
// 있다면 해당 인덱스의 원소 - 현재 원소를 뺀 값(함수 안에서는 현재 원소를 포함한 계산이었으므로)을 업데이트
