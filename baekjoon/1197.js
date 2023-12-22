// 최소 스패닝 트리 : 최소 스패닝 트리
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, m] = input.shift();

// union find
// function getParent(parentArr, x) {
//   if (parentArr[x] === x) return x;
//   // return 누락 주의
//   else return getParent(parentArr, parentArr[x]);
// }

// function union(parentArr, a, b) {
//   a = getParent(parentArr, a);
//   b = getParent(parentArr, b);

//   if (a > b) parentArr[a] = b;
//   else parentArr[b] = a;
// }

// function find(parentArr, a, b) {
//   a = getParent(parentArr, a);
//   b = getParent(parentArr, b);
//   return a === b;
// }

// // Kruskal ver.
// const parentArr = new Array(n + 1).fill(0).map((_v, i) => i);
// const answer = [];

// // 1. 간선을 크기의 오름차순으로 정렬
// const sorted = input.sort((a, b) => a[2] - b[2]);

// // 2. 제일 비용이 낮은 간선부터 선택
// for (let node of sorted) {
//   // 3. 같은 그래프에 있는지 확인
//   if (!find(parentArr, node[0], node[1])) {
//     // 3-1. 같은 그래프가 아니라면, 그래프에 추가(union)
//     union(parentArr, node[0], node[1]);
//     answer.push(node[2]);
//   }
//   // 3-2. 같은 그래프라면 스킵
// }

// console.log(answer.reduce((prev, curr) => prev + curr));

// Prim ver.
class MinHeap {
  #heap;
  constructor() {
    this.#heap = [null];
    this.size = 0;
  }

  push = (v) => {
    this.#heap.push(v);
    this.size++;
    let parent = Math.floor(this.size / 2);
    let curr = this.size;
    // 루트에 도달할 때까지
    while (parent !== 0) {
      if (this.#heap[parent][0] >= v[0])
        [this.#heap[parent], this.#heap[curr]] = [
          this.#heap[curr],
          this.#heap[parent],
        ];
      curr = parent;
      parent = Math.floor(parent / 2);
    }
  };

  pop = () => {
    if (this.size === 0) return;
    if (this.size === 1) this.#heap.pop();
    else this.#heap[1] = this.#heap.pop();
    this.size--;
    let curr = 1;
    let left = curr * 2;
    let right = left + 1;
    let isLeftSmall = true;
    // 자식 노드가 하나도 없을 때까지
    while (this.#heap[left] !== undefined) {
      // 오른쪽 자식 노드가 있는 경우
      if (this.#heap[right] !== undefined) {
        // 여기서 else 문을 주지 않아서 모든 경우의 수를 처리할 수 없었음
        if (this.#heap[left][0] < this.#heap[right][0]) isLeftSmall = true;
        else isLeftSmall = false;
      }
      // 이전에 isLeftSmall = false일 수도 있으므로, 오른쪽 자식이 없다면 isLeftSmall을 반드시 설정해주어야 함
      else isLeftSmall = true;

      if (this.#heap[curr][0] > this.#heap[isLeftSmall ? left : right][0])
        [this.#heap[curr], this.#heap[isLeftSmall ? left : right]] = [
          this.#heap[isLeftSmall ? left : right],
          this.#heap[curr],
        ];
      curr = isLeftSmall ? left : right;
      left = curr * 2;
      right = left + 1;
    }
  };

  top = () => this.#heap[this.size === 0 ? 0 : 1];

  isEmpty = () => {
    return this.#heap.length === 1;
  };

  print = () => {
    console.log(this.#heap);
  };
}

const heap = new MinHeap();
const graph = {};
let answer = 0;
let cnt = 0;
let visited = new Array(n + 1).fill(false);

for (let [start, end, weight] of input) {
  if (!graph[start]) graph[start] = [[end, weight]];
  else graph[start].push([end, weight]);
  if (!graph[end]) graph[end] = [[start, weight]];
  else graph[end].push([start, weight]);
}

visited[1] = true;
for (let node of graph[1]) {
  heap.push([node[1], node[0]]);
}

while (cnt < n - 1) {
  const [weight, next] = heap.top();
  heap.pop();
  if (visited[next]) continue;
  visited[next] = true;
  cnt++;
  answer += weight;
  for (let node of graph[next]) {
    if (visited[node[0]]) continue; // 실수
    heap.push([node[1], node[0]]);
  }
}

console.log(answer);
