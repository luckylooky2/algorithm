// 휴게소 세우기 : 이분 탐색, 매개변수 탐색
// const diffs = [];
// let prev = 0;
// let i = 2;
// const res = {};

// for (v of sorted) {
//   diffs.push(v - prev);
//   prev = v;
// }
// diffs.push(length - sorted[sorted.length - 1]);

// const diffSorted = diffs.sort((a, b) => a - b);
// console.log(diffSorted);

// function check(num, target) {
//   const copy = diffSorted.map((v) => v);
//   let count = 0;
//   let flag = true;
//   const max = copy[copy.length - 1];
//   const divided = Math.ceil(max / num);
//   while (count < target) {
//     const curr = copy[copy.length - 1];
//     const quotinent = Math.ceil(curr / divided);
//     let v = curr;
//     const d = Math.floor(curr / quotinent);
//     // console.log(curr, quotinent, num);
//     if (curr === divided) return [count, copy[copy.length - 1]];
//     copy.pop();
//     for (let j = 0; j < quotinent - 1; j++) {
//       copy.push(d);
//       count++;
//       v -= d;
//     }
//     copy.push(v);
//     copy.sort((a, b) => a - b);
//     // console.log(count, target);
//     console.log(copy);
//   }
//   return [count, copy[copy.length - 1]];
// }

// // while (true) {
// //   const count = check(i, toBuildNum);
// //   console.log(count);
// //   res[i] = Math.ceil(diffSorted[diffSorted.length - 1] / (2 + i));
// //   if (count == toBuildNum) {
// //     console.log(res[i]);
// //     break;
// //   } else if (count > toBuildNum) {
// //     for (let j = 0; j < toBuildNum; j++) {
// //       const max = diffSorted[diffSorted.length - 1];
// //       let v = max;
// //       const d = Math.floor(max / (i === 0 ? i + 2 : i + 1));
// //       console.log(v, d);
// //       // 추가
// //       for (let k = 0; k < (i === 0 ? i + 1 : i); k++) {
// //         diffSorted.push(d);
// //         v -= d;
// //       }
// //       diffSorted.push(v);
// //       diffSorted.sort((a, b) => a - b);
// //       diffs.pop();
// //       console.log(diffSorted);
// //     }
// //     console.log(diffSorted[diffSorted.length - 1]);
// //     break;
// //   }
// //   i++;
// // }
// let result = check(i, toBuildNum);
// console.log(result);
// while (result[0] + i <= toBuildNum) {
//   i++;
//   result = check(i, toBuildNum);
//   console.log(result, i);
// }
// console.log(result[1]);
// // console.log(res);

// // 추가
// //   diffSorted.push(Math.ceil(max / 2));
// //   diffSorted.push(Math.floor(max / 2));
// //   diffSorted.sort((a, b) => a - b);
// //   diffs.pop();
// //   console.log(diffSorted);
// // }
// // for (let i = 0; i < toBuildNum; i++) {
// //   const max = diffSorted[diffSorted.length - 1];
// //   console.log(max);
// //   // 추가
// //   diffSorted.push(Math.ceil(max / 2));
// //   diffSorted.push(Math.floor(max / 2));
// //   diffSorted.sort((a, b) => a - b);
// //   diffs.pop();
// //   console.log(diffSorted);
// // }

// 이 문제에서 각 (휴게소 간 거리) 차이를 등분하는 것은 오히려 문제를 더 어렵게 푸는 것
// 차이들을 각각 몇 등분할 것인지를 고려해야 하기 때문 => 경우의 수가 너무 많아짐
// 등분을 하게 되면 소수점 때문에 정확한 등분을 하지 못하는 경우가 있기 때문에, 오차로 인해 경우의 수가 또 추가됨
// 대신, 답(최소 거리)를 먼저 정해놓고 답이 맞는지 확인하는 방식을 선택
// 모든 차이를 최소 거리로 나누면 최소 거리보다 더 큰 거리는 없게 되게 됨
// 비록 나머지가 되는 거리는 제각각이지만, 그 거리들을 고려할 필요는 전혀 없음(그 거리들이 답에는 전혀 관여하지 않기 때문에)
// 따라서 1부터 length까지 반복문을 돌며, 조건을 만족하는 최소 거리를 찾으면 됨(브루트 포스)
// 단, 브루트 포스로 일일이 구한 값의 배열이 증가하거나 감소한다면(즉, 정렬이 되어 있다면)
// 브루트 포스를 사용하지 않고 이분 탐색을 사용하는 것이 시간을 절약할 수 있음
// 예를 들어, 브루트 포스로 1부터 n까지 구한 값이 증가한다면 n / 2의 값을 확인하여
// 작다면 하위 구간의 중간 지점을, 크다면 상위 구간의 중간 지점을 확인함
// 이를 반복함으로써 적은 시간으로 답에 도달할 수 있음

// 이 문제에서는 최대 거리에 따른 세울 수 있는 휴게소의 개수 배열이 줄어드는 감소 함수이고 값이 중복될 수도 있기 때문에
// 특정 값을 찾더라도 왼쪽에 중복 값이 있을 수도 있기 때문에 왼쪽도 확인을 해야 함(중복 값이 존재하기 때문, 문제에서 요구하는 것은 최소값)

const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [currNum, toBuildNum, length] = input.shift();
const arr = currNum === 0 ? [] : input.shift();
const sorted = [0].concat(arr.sort((a, b) => a - b));
sorted.push(length);

let start = 1,
  end = length;
let mid,
  answer = 0;

function check(mid, target) {
  let count = 0;
  for (let i = 1; i < sorted.length; i++) {
    // 휴게소 간 거리
    const diff = sorted[i] - sorted[i - 1];
    // diff 안에 세울 수 있는 새로운 휴게소의 수
    count += Math.floor(diff / mid);
    // 나누어 떨어지면, 끝점을 포함하게 되므로
    if (diff % mid === 0) count--;
  }
  return count > target;
}

while (start <= end) {
  mid = Math.floor((start + end) / 2);
  // 새로운 휴게소의 개수가 지어야 하는 개수보다 크면, mid를 늘려야 함
  // mid + 1이 아니라 start를 조정하여 반으로 줄임(업다운)
  if (check(mid, toBuildNum)) start = mid + 1;
  else {
    answer = mid;
    end = mid - 1;
  }
}

console.log(answer);
