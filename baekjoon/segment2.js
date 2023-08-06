const arr = Array.from({ length: 10 }, (v, i) => i + 1);
const tree = [undefined];

function segtree(start, end, node = 1) {
  if (start === end) return (tree[node] = arr[start]);
  const mid = Math.floor((start + end) / 2);
  const leftValue = segtree(start, mid, 2 * node);
  const rightValue = segtree(mid + 1, end, 2 * node + 1);
  return (tree[node] = leftValue + rightValue);
}

function query(start, end, currLeft, currRight, node = 1) {
  if (currRight < start || currLeft > end) return Infinity;
  // 1. 트리를 이용
  if (start <= currLeft && currRight <= end) return tree[node];
  // if (start <= currLeft && currRight <= end) {
  //   let res = 0;
  //   for (let i = currLeft; i <= currRight; i++) res += arr[i];
  //   return res;
  // }
  const mid = Math.floor((currLeft + currRight) / 2);
  // 2. 시작과 끝은 currLeft, currRight => start, end가 아님
  const leftValue = query(start, end, currLeft, mid, 2 * node);
  const rightValue = query(start, end, mid + 1, currRight, 2 * node + 1);
  // const leftValue = query(start, end, start, mid, 2 * node);
  // const rightValue = query(start, end, mid + 1, end, 2 * node + 1);
  if (leftValue === Infinity) return rightValue;
  else if (rightValue === Infinity) return leftValue;
  else return leftValue + rightValue;
}

segtree(0, arr.length - 1);

console.log(query(2, 5, 0, arr.length - 1));
