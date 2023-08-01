const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const final = [];

// function calc(first, last, element) {
//   const obj = {};
//   const lst = element.filter((v, i) => first <= i && i <= last);
//   // 캐시화?
//   for (let i = 0; i < lst.length; i++) {
//     obj[first + i] = lst[i];
//   }
//   let min = lst.sort((a, b) => a - b)[0];
//   const result = Object.entries(obj)
//     .map(([key, value]) => {
//       if (value === min) return parseInt(key, 10);
//       else undefined;
//     })
//     .filter((v) => v !== undefined)[0];

//   return result;
// }

function recur(tree, element, first, last, left, right, ans) {
  // console.log("recur :", first, last);
  if (first > last) return;
  if (first === last) return ans.push(element[first]);

  // 최소값 인덱스 구하기
  const minIndex = query(tree, element, first, last, left, right);
  // console.log(minIndex, first, last);
  if (!(first <= minIndex && minIndex <= last)) return;
  // 최소값 인덱스 기준 넓이 저장
  ans.push(element[minIndex] * (last - first + 1));

  recur(tree, element, first, minIndex - 1, left, right, ans);
  recur(tree, element, minIndex + 1, last, left, right, ans);
}

// 고정할 변수와 변동할 변수를 반대로 지정했기 때문에 이상한 결과
// 어떻게 logN?
function query(tree, element, start, end, currLeft, currRight, node = 1) {
  // 이 함수에서 left, right는 고정
  // start, end는 변동
  // console.log(`query ${start} ${end}:`, currLeft, currRight, node);
  if (end < currLeft || currRight < start) {
    return Infinity;
  }
  if (start <= currLeft && currRight <= end) {
    // console.log("select :", node);
    return tree[node];
  }
  const mid = Math.floor((currLeft + currRight) / 2);
  // console.log(mid);
  const leftIndex = query(tree, element, start, end, currLeft, mid, 2 * node);
  // currRight 대신에 end를 사용한 실수
  const rightIndex = query(
    tree,
    element,
    start,
    end,
    mid + 1,
    currRight,
    2 * node + 1
  );
  // console.log(`left : ${leftIndex}, right : ${rightIndex}`);
  if (leftIndex === Infinity) return rightIndex;
  else if (rightIndex === Infinity) return leftIndex;
  else
    return element[leftIndex] <= element[rightIndex] ? leftIndex : rightIndex;
}

function segmentTree(tree, element, start, end, node = 1) {
  if (start === end) return (tree[node] = start);
  const mid = Math.floor((start + end) / 2);
  const leftIndex = segmentTree(tree, element, start, mid, 2 * node);
  const rightIndex = segmentTree(tree, element, mid + 1, end, 2 * node + 1);
  return (tree[node] =
    element[leftIndex] < element[rightIndex] ? leftIndex : rightIndex);
}

input.forEach((v) => {
  if (v[0] === 0) return;
  const tree = [undefined];
  const element = v.filter((v, i) => i !== 0);
  const ans = [];
  segmentTree(tree, element, 0, v[0] - 1);
  // console.log(tree);
  recur(tree, element, 0, v[0] - 1, 0, v[0] - 1, ans);
  // 여기서 정답 추가
  // start와 end를 비교해서 끝내기에는 무리가 있음
  final.push(ans.sort((a, b) => a - b)[ans.length - 1]);
});

console.log(final.join("\n"));
