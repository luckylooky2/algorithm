// 트리 : 트리, 분할 정복, 재귀
const input = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [t] = input[0];
const answer = [];
let i = 0;

function recur(preOrder, inOrder, n, result) {
  let [preRoot, preLeft, preRight] = [preOrder[0], [], []];
  let [inRoot, inLeft, inRight] = [0, [], []];

  if (preOrder.length === 1) {
    result.push(preOrder[0]);
    return;
  } else if (preOrder.length === 0) {
    return;
  }

  // slice에서 마지막에 n을 넣지 않았더니 틀렸다고 나옴
  // why?
  // n개 보다 더 많은 경우가 있는가?
  for (let a = 0; a < inOrder.length; a++) {
    if (inOrder[a] === preRoot) {
      inRoot = preRoot;
      inLeft = inOrder.slice(0, a);
      inRight = inOrder.slice(a + 1, n);
      preLeft = preOrder.slice(1, a + 1);
      preRight = preOrder.slice(a + 1, n);
      break;
    }
  }
  recur(preLeft, inLeft, preLeft.length, result); // left
  recur(preRight, inRight, preRight.length, result); // right
  result.push(preRoot); // root
}

while (i < t) {
  const offset = 3 * i;
  const [n] = input[1 + offset];
  const preOrder = input[2 + offset];
  const inOrder = input[3 + offset];
  const result = [];
  recur(preOrder, inOrder, n, result);
  answer.push(result.join(" "));
  i++;
}

console.log(answer.join("\n"));
