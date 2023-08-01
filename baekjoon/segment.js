const tree = [undefined];
const element = Array.from({ length: 10 }, (v, i) => i + 1);

function segmentTree(start, end, node = 1) {
  if (start === end) return (tree[node] = start);
  const mid = Math.floor((start + end) / 2);
  const leftIndex = segmentTree(start, mid, 2 * node);
  const rightIndex = segmentTree(mid + 1, end, 2 * node + 1);
  // 구간에서 적용할 논리 : 합, 최대값, 최소값 ...
  return (tree[node] =
    element[leftIndex] < element[rightIndex] ? leftIndex : rightIndex);
}

segmentTree(0, element.length - 1);

// 구간 query 함수
function query(start, end, currLeft, currRight, node = 1) {
  if (end < currLeft || currRight < start) {
    return Infinity;
  }
  if (start <= currLeft && currRight <= end) {
    return tree[node];
  }
  const mid = Math.floor((currLeft + currRight) / 2);
  const leftIndex = query(start, end, currLeft, mid, 2 * node);
  const rightIndex = query(start, end, mid + 1, currRight, 2 * node + 1);

  if (leftIndex === Infinity) return rightIndex;
  else if (rightIndex === Infinity) return leftIndex;
  else return element[leftIndex] < element[rightIndex] ? leftIndex : rightIndex;
}

// 2, 5 index 구간에서 최소 인덱스를 찾음
const minIndex = query(2, 5, 0, element.length - 1);

console.log(minIndex);
