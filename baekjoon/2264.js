const fs = require("fs");
const [length, inOrder, postOrder] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const n = inOrder.length;
const final = [];

function recur(n, inStart, inEnd, postStart, postEnd) {
  if (n === 1) {
    // inOrder? postOrder?
    final.push(inOrder[inStart]);
    // console.log("push :", inOrder[inStart]);
    return;
  }
  if (n == 2) {
    final.push(postOrder[postEnd]);
    final.push(postOrder[postStart]);
    // console.log("push :", postOrder[postEnd], postOrder[postStart]);
    return;
  }

  const root = postOrder[postEnd];
  // right 노드에서는 조정이 필요
  const rootIndex = inOrder.findIndex((elem) => elem === root);

  const firstStart = inStart;
  const firstEnd = rootIndex - 1;
  const first = firstEnd - firstStart + 1;
  const secondStart = rootIndex + 1;
  const secondEnd = inEnd;
  const second = secondEnd - secondStart + 1;
  // 맨 뒤는 빼고
  const firstPostStart = postStart;
  const firstPostEnd = postStart + first - 1;
  const secondPostStart = postEnd - 1 - second + 1;
  const secondPostEnd = postEnd - 1;
  // console.log(inStart, inEnd, n);
  // console.log("root index : ", root, rootIndex);
  // console.log("index : ", firstStart, firstEnd, firstPostStart, firstPostEnd);
  // console.log("count : ", first, second);
  // console.log("post : ", postStart, postEnd, secondPostStart, secondPostEnd);

  // root 노드 추가
  // console.log("push :", inOrder[rootIndex]);
  final.push(inOrder[rootIndex]);
  // left 노드
  if (firstEnd >= firstStart)
    recur(first, firstStart, firstEnd, firstPostStart, firstPostEnd);
  // right 노드
  if (secondEnd >= secondStart)
    recur(second, secondStart, secondEnd, secondPostStart, secondPostEnd);
}

recur(n, 0, n - 1, 0, n - 1);

console.log(final.join(" "));
