const fs = require("fs");
const [length, inOrder, postOrder] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const n = inOrder.length;
const index = {};
const final = [];

inOrder.map((v, i) => (index[v] = i));

function recur(n, inStart, inEnd, postStart, postEnd) {
  if (n === 1) return final.push(inOrder[inStart]);
  if (n === 2) return final.push(postOrder[postEnd], postOrder[postStart]);

  const root = postOrder[postEnd];
  const rootIndex = parseInt(index[root], 10);

  const firstStart = inStart;
  const firstEnd = rootIndex - 1;
  const first = firstEnd - firstStart + 1;
  const secondStart = rootIndex + 1;
  const secondEnd = inEnd;
  const second = secondEnd - secondStart + 1;
  const firstPostStart = postStart;
  const firstPostEnd = postStart + first - 1;
  const secondPostStart = postEnd - 1 - second + 1;
  const secondPostEnd = postEnd - 1;

  // root 노드 추가
  final.push(inOrder[rootIndex]);
  // left-side 재귀 호출
  if (firstEnd >= firstStart)
    recur(first, firstStart, firstEnd, firstPostStart, firstPostEnd);
  // right-side 재귀 호출
  if (secondEnd >= secondStart)
    recur(second, secondStart, secondEnd, secondPostStart, secondPostEnd);
}

recur(n, 0, n - 1, 0, n - 1);

console.log(final.join(" "));
