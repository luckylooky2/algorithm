// 트리 순회 : 그래프, 트리, 재귀
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const n = parseInt(input.shift()[0], 10);
const edges = input;
const tree = new Array(n + 1).fill(null).map(() => new Array(3).fill(Infinity));
const ROOT = 0,
  LEFT = 1,
  RIGHT = 2;
const alpha = {};
const alphaBase = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";

for (let i = 1; i <= 26; i++) alpha[alphaBase[i]] = i;

for (let [curr, left, right] of edges) {
  tree[alpha[curr]][ROOT] = curr;
  tree[alpha[curr]][LEFT] = left;
  tree[alpha[curr]][RIGHT] = right;
}

function levelOrder(tree) {
  const q = ["A"];
  const answer = [];

  while (q.length !== 0) {
    const top = q.shift();

    answer.push(tree[alpha[top]][ROOT]);
    if (tree[alpha[top]][LEFT] !== ".") {
      q.push(tree[alpha[top]][LEFT]);
    }
    if (tree[alpha[top]][RIGHT] !== ".") {
      q.push(tree[alpha[top]][RIGHT]);
    }
  }
  console.log(answer.join(""));
}

// root -> left -> right
function preOrder(tree) {
  const answer = [];

  function recur(tree, curr) {
    if (curr === ".") return;

    answer.push(tree[alpha[curr]][ROOT]);
    recur(tree, tree[alpha[curr]][LEFT]);
    recur(tree, tree[alpha[curr]][RIGHT]);
  }

  recur(tree, "A");
  console.log(answer.join(""));
}

// left -> root -> right
function midOrder(tree) {
  const answer = [];

  function recur(tree, curr) {
    if (curr === ".") return;

    recur(tree, tree[alpha[curr]][LEFT]);
    answer.push(tree[alpha[curr]][ROOT]);
    recur(tree, tree[alpha[curr]][RIGHT]);
  }

  recur(tree, "A");
  console.log(answer.join(""));
}

// left -> right -> root
function postOrder(tree) {
  const answer = [];

  function recur(tree, curr) {
    if (curr === ".") return;

    recur(tree, tree[alpha[curr]][LEFT]);
    recur(tree, tree[alpha[curr]][RIGHT]);
    answer.push(tree[alpha[curr]][ROOT]);
  }

  recur(tree, "A");
  console.log(answer.join(""));
}

preOrder(tree);
midOrder(tree);
postOrder(tree);

// 직접 트리를 그릴 것인가? Node class 구현
// 다른 방법으로 트리를 대체할 것인가? graph 객체 or tree 배열
// graph 객체 => 인접 리스트를 이용하여 간접적으로 구현, 하나의 노드는 최대 3개의 다른 노드와 연결되어 있을 수 있음.
// tree 배열 => graph 객체 만으로는 모든 트리의 정보를 저장하기 힘듦. 부모 노드에 관한 정보를 저장하는 배열을 따로 만들어야 하기 때문에, 자식 노드에 대한 정보도 저장하는 배열을 같이 만드는 것이 좋을 듯
