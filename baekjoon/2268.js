// 수들의 합 7 : 세그먼트 트리
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n, m] = input.shift();
const modified = new Map();
const commands = input;
const [SUM, MODIFY] = [0, 1];
const answer = [];

const tree = [null];
const element = Array.from({ length: 10 }).fill(0);

function segmentTree(start, end, node = 1) {
  if (start === end) return (tree[node] = start);
  const mid = Math.floor((start + end) / 2);
  const leftIndex = segmentTree(start, mid, 2 * node);
  const rightIndex = segmentTree(mid + 1, end, 2 * node + 1);
  // 구간에서 적용할 논리 : 합, 최대값, 최소값 ...
  return (tree[node] = element[leftIndex] < element[rightIndex] ? leftIndex : rightIndex);
}

segmentTree(0, element.length - 1);

// function lowerBound(start, end, target, arr) {
//   const mid = Math.floor((start + end) / 2);

//   if (start === end) {
//     return start;
//   }

//   if (arr[mid][0] >= target) {
//     return lowerBound(start, mid, target, arr);
//   } else {
//     return lowerBound(mid + 1, end, target, arr);
//   }
// }

// for (const [command, arg1, arg2] of commands) {
//   if (command === SUM) {
//     const small = Math.min(arg1, arg2);
//     const big = Math.max(arg1, arg2);
//     const entries = [...modified.entries()].sort((a, b) => a[0] - b[0]);
//     let result = 0;
//     // small보다 같거나 큰
//     if (entries.length) {
//       const index = lowerBound(0, entries.length - 1, small, entries);
//       for (let i = index; i < entries.length; i++) {
//         const [key, value] = entries[i];
//         if (key > big) {
//           break;
//         }
//         result += value;
//       }
//     }
//     answer.push(result);
//   } else if (command === MODIFY) {
//     modified.set(arg1, arg2);
//   }
// }

// console.log(answer.join("\n"));

// sums[1] = 1 ~ 1
// sums[3] = 1 ~ 3
// sums[6] = 1 ~ 5

// Sum(4, 5) = sums[5] - sums[3]
// Modify(4, 1)

// sums 배열 순회하며 최신화 => 시간을 줄여야 함
// - 1) 1/2 지점에서 왼쪽이면 왼쪽을 모두 -, 오른쪽이면 오른쪽을 모두 + 하는 방법 => 시간 초과 O(n / 2)
// - 2) Modify 버퍼에 모은 뒤, Sum이 되기 전에 sums에 적용 => 최악의 경우, 한 번씩 번갈아가며 O(500000 * 500000): 약 250초

// 세그먼트 트리? => 구현 불가
// - 요소가 n개인 세그먼트 트리
// - query, update 두 함수를 만들어야 함

// 상수 시간에 누적 값을 채우는 방법?
// - 모든 인덱스에 적용되는 것은 아니라서 하나의 값을 사용하기에는 어려움
// - 여러 값을 사용하기에는 순회해야 함

// 추가할 수 있는 것이 최대 백만 번이다
// - 0의 개수가 점점 줄어들 것 => 초반의 계산은 노가다?

// 1 2 3 4 5
// 0 0 0 1 1

// modify를 하면 sums의 해당 인덱스 뒤의 값이 모두 한 번에 더해져야 한다
