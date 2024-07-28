// 트리 : 트리, 깊이 우선 탐색, 재귀 호출
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [nodeCount] = input.shift();
const parentOfNode = input.shift();
const [nodeToRemove] = input.shift();
const isLeaf = new Array(nodeCount).fill(true);
const children = new Array(nodeCount).fill(null).map(() => new Array(0));
let flag = 0;

function recur(target, isLeaf, children) {
  isLeaf[target] = false;
  for (const elem of children[target]) {
    recur(elem, isLeaf, children);
  }
}

for (let i = 0; i < parentOfNode.length; i++) {
  const node = parentOfNode[i];
  if (node === -1) {
  } else {
    isLeaf[node] = false;
    children[node].push(i);
  }
}

if (isLeaf[nodeToRemove] === true) {
  isLeaf[nodeToRemove] = false;
} else {
  for (const elem of children[nodeToRemove]) {
    recur(elem, isLeaf, children);
  }
}

// 지우려는 노드의 부모 노드의 자식이 하나라면, 부모 노드가 리프 노드가 되므로 + 1
if (
  parentOfNode[nodeToRemove] !== -1 &&
  children[parentOfNode[nodeToRemove]].length === 1
) {
  flag = 1;
}

console.log(isLeaf.filter((v) => v).length + flag);
