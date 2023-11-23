// 수 고르기 : 이분 탐색, 투 포인터
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

// 이분 탐색 ver.
// target을 만족하는 가장 작은 low index를 구함
// function lowerBound(arr, target) {
//   let low = 0;
//   let high = arr.length;

//   while (low < high) {
//     const mid = Math.floor((low + high) / 2);

//     if (arr[mid] < target) low = mid + 1;
//     else high = mid;
//   }

//   return low;
// }
// for (value of arr) {
//   const res = lowerBound(arr, value + m);
//   if (res != n) answer = Math.min(answer, Math.abs(arr[res] - value));
// }

// console.log(answer);

// // 하나의 현재 원소 elem을 기준으로 elem + m 보다 가장 작은 인덱스를 구함
// // 있으면 해당 인덱스를 반환, 없으면 가장 마지막 인덱스를 반환
// // 있다면 해당 인덱스의 원소 - 현재 원소를 뺀 값(함수 안에서는 현재 원소를 포함한 계산이었으므로)을 업데이트

// 투 포인터 ver.
let s = 0;
e = 0;
while (e < n) {
  if (arr[e] - arr[s] >= m) {
    answer = Math.min(answer, arr[e] - arr[s]);
    s++;
  } else e++;
}

console.log(answer);

// 투 포인터
// 배열에서 원래 O(n^2)에 처리되는 작업을 2개의 포인터를 움직임으로써 O(n)에 해결하는 알고리즘
// e.g. [1, 10, 12, 50, 1000] 에서 차이가 40 이상인 최소값을 찾으려 할 때
// 브루트 포스 : (0,1) (0,2) (0,3) (0,4) (1,2) (1,3) (1,4) (2,3) (2,4) (3,4) 탐색
// 투 포인터 : (0,1) (0,2) (0,3) (1,3) (2,3) (2,4) (3,4) 탐색
// (0,4) (1,2) (1,4) 를 탐색해도 되지 않는 이유?
// 이미 이전 단계에서 더 작은 차이를 가진 경우를 통해 고려되었기 때문에 별도로 탐색할 필요가 없음
// 중복을 방지하여 효율적으로 탐색을 수행
