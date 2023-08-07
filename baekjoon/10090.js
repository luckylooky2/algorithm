const [input, arr] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const n = input[0];
const tree = [undefined];
let final = 0;

// 백트래킹 : 100000 입력만 해도 굉장히 느려짐
function recur(depth = 0, index = 0, result = []) {
  if (depth === 2) {
    if (result[0] > result[1]) final++;
    return;
  }
  for (let i = index; i < n; i++) {
    if (result.includes(arr[i])) continue;
    result.push(arr[i]);
    recur(depth + 1, i + 1, result);
    result.pop();
  }
}

// recur();

function segTree(start, end, node = 1) {
  if (start === end) return (tree[node] = arr[start]);
  const mid = Math.floor((start + end) / 2);
  const left = segTree(start, mid, 2 * node);
  const right = segTree(mid + 1, end, 2 * node + 1);
  return (tree[node] = Math.max(left, right));
}

function query(n, start, end, currLeft, currRight, node = 1) {
  if (currRight < start || currLeft > end) return Infinity;
  if (start <= currLeft && currRight <= end) return tree[node];
  // const mid = Math.floor((currLeft + currRight) / 2);
  let left = 0,
    right = 0;
  if (tree[node] >= n) left = query(n, start, end, start, mid, 2 * node);

  if (tree[node] >= n) right = query(n, start, end, mid + 1, end, 2 * node + 1);
  if (left === Infinity) return;
  else if (right === Infinity) return;
  else return;
}

segTree(0, n - 1);

console.log(tree);

// console.log(final);
