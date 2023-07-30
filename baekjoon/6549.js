const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const final = [];

function calc(first, last, element) {
  const obj = {};
  //   console.log(first, last);
  const lst = element.filter((v, i) => first <= i && i <= last);
  // 캐시화
  for (let i = 0; i < lst.length; i++) {
    obj[first + i] = lst[i];
  }
  //   console.log(obj[lst.sort((a, b) => a - b)[0]]);
  //   console.log(first, last, obj);
  let min = lst.sort((a, b) => a - b)[0];
  const result = Object.entries(obj)
    .map(([key, value]) => {
      if (value === min) return parseInt(key, 10);
      else undefined;
    })
    .filter((v) => v !== undefined)[0];

  return result;
}

function recur(first, last, element, ans = []) {
  if (first >= last) {
    if (last === element.length - 1) {
      final.push(ans.sort((a, b) => a - b)[ans.length - 1]);
    }
    return;
  }

  // 최소값 인덱스 구하기
  const minIndex = calc(first, last, element);
  // 최소값 인덱스 기준 넓이 저장
  ans.push(element[minIndex] * (last - first + 1));

  recur(first, minIndex - 1, element, ans);
  recur(minIndex + 1, last, element, ans);
}

// function query(tree, element, start, end, left, right, node = 1) {
//   console.log("q :", start, end, left, right, node);
//   if (end < left || right < start) return Infinity;
//   if (left <= start && end <= right) {
//     return tree[node];
//   }
//   const mid = Math.floor((start + end) / 2);
//   const leftIndex = query(tree, element, start, mid, left, right, 2 * node);
//   const rightIndex = query(
//     tree,
//     element,
//     mid + 1,
//     end,
//     left,
//     right,
//     2 * node + 1
//   );
//   console.log("index :", leftIndex, rightIndex);
//   if (leftIndex === Infinity) return rightIndex;
//   else if (rightIndex === Infinity) return leftIndex;
//   else
//     return element[leftIndex] <= element[rightIndex] ? leftIndex : rightIndex;
// }

// function segmentTree(tree, element, start, end, node = 1) {
//   if (start === end) return (tree[node] = start);
//   const mid = Math.floor((start + end) / 2);
//   const leftIndex = segmentTree(tree, element, start, mid, 2 * node);
//   const rightIndex = segmentTree(tree, element, mid + 1, end, 2 * node + 1);
//   // 둘 중에
//   return (tree[node] =
//     element[leftIndex] <= element[rightIndex] ? leftIndex : rightIndex);
// }

input.forEach((v) => {
  if (v[0] === 0) return;
  //   const tree = [undefined];
  const element = v.filter((v, i) => i !== 0);
  //   segmentTree(tree, element, 0, v[0] - 1);
  //   console.log(tree);
  recur(0, v[0] - 1, element);
});

console.log(final.join("\n"));
