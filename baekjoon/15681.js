// 트리와 쿼리 : 트리, 깊이 우선 탐색, 트리에서의 동적 계획법
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
let idx = 0;
const [n, root, queries] = input[idx++];
const adjacent = new Map();
const answer = [];
const count = new Array(n + 1).fill(0);

// 트리 생성
for (let i = 0; i < n - 1; i++) {
  const [u, v] = input[idx++];
  if (adjacent.has(u)) {
    adjacent.get(u).push(v);
  } else {
    adjacent.set(u, [v]);
  }
  if (adjacent.has(v)) {
    adjacent.get(v).push(u);
  } else {
    adjacent.set(v, [u]);
  }
}

(function recur(currNode, parentNode) {
  const childNode = adjacent.get(currNode);

  // 부모의 자식이 하나라면 진행이 안되는 예외 처리
  if (currNode !== root && childNode.length === 1) {
    count[currNode] = 1;
    return count[currNode];
  }

  let sum = 0;
  for (const child of childNode) {
    if (child === parentNode) {
      continue;
    }
    sum += recur(child, currNode);
  }
  // 자신 포함
  count[currNode] = sum + 1;
  return count[currNode];
})(root);

// 쿼리
for (let i = 0; i < queries; i++) {
  const [query] = input[idx++];
  answer.push(count[query]);
}

console.log(answer.join("\n"));

// 트리의 모든 노드를 방문하는 시간 복잡도는 O(n)이다.
// - 깊이 우선 탐색을 이용하면, 자식을 먼저 탐색하기 때문에 각 노드 기준에서 서브 트리를 순회할 수 있다.
// - 다시 말해서, 서브 트리와 관련된 정보를 계산할 수 있다.
// - 서브 트리를 이용하여 값을 저장할 수 있으므로 상위 노드는 하위 노드의 서브 트리 정보를 사용할 수 있다.
