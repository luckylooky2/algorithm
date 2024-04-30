// K번째 수 : 이분 탐색, 매개변수 탐색, 수학
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, k] = input.map((v) => Number(v));

// brute forece ver.
// const values = { 1: 1 };

// for (let i = 2; i <= n; i++) {
//   for (let j = 1; j <= i; j++) {
//     if (values[i * j] === undefined) {
//       values[i * j] = 0;
//     }
//     values[i * j] += i === j ? 1 : 2;
//   }
// }

// (function () {
//   let acc = 0;
//   const map = Object.entries(values);
//   for (const [key, value] of map) {
//     acc += value;
//     if (acc >= k) {
//       return console.log(key);
//     }
//   }
//   return console.log(n * n);
// })();

// binary search ver.
function count(n, target) {
  let ret = 0;

  for (let i = 1; i <= n; i++) {
    ret += Math.min(n, Math.floor(target / i));
  }
  return ret;
}

function binarySearch(start, end, target) {
  if (start === end) {
    console.log(start);
    return;
  }

  const mid = Math.floor((start + end) / 2);

  if (count(n, mid) < target) {
    binarySearch(mid + 1, end, target);
  } else {
    binarySearch(start, mid, target);
  }
}

binarySearch(0, n * n, k);

// 행렬에서 특정 수 m보다 작은 원소의 개수를 구하는 방법
// 1) 완전 탐색
// - 행렬을 모두 순회하며(n^2) 개수를 구함
// 2) 행별 탐색
// - 행이나 열로 탐색한다면 n 시간 복잡도 안에 가능하므로 효율적
// - => Math.min(n, m / i)

// 1) 브루트 포스
// - 1 ~ n 까지 반복하면서, 증가하는 요소의 개수를 증가시키는 방법으로 저장 => 메모리 초과, 시간 초과 발생
// - e.g.
// - n = 2 : 2(2 * 1)에 2 증가, 4(2 * 2)에 1 증가
// - n = 3 : 3(3 * 1)에 2 증가, 6(3 * 2)에 2 증가, 9(3 * 3)에 1 증가
// - n보다 작은 수들의 값을 차례대로 모두 더해서 구함

// 2) 이분 탐색
// - 위에서 구한 m보다 작은 원소의 개수를 어떻게 활용할 것인가?
// - m보다 작은 원소의 개수를 반환하는 함수는 증가 또는 감소 함수이다
// - 그러므로 함수에서 반환된 값을 찾을 때까지, m을 조절한다
