// 문제집
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, m] = input.shift();
const edges = input;
const graph = {};
const answer = [];
const indegrees = new Array(n + 1).fill(0);

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  pop() {
    if (this.isEmpty()) return null;

    const root = this.heap[0];
    const lastNode = this.heap.pop();

    if (!this.isEmpty()) {
      this.heap[0] = lastNode;
      this.heapifyDown();
    }

    return root;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let smallest = index;
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex] < this.heap[smallest]
      ) {
        smallest = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex] < this.heap[smallest]
      ) {
        smallest = rightChildIndex;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}

const heap = new MinHeap();

for (let i = 1; i <= n; i++) graph[i] = [];

for (let [from, to] of edges) {
  graph[from].push(to);
  indegrees[to]++;
}

for (let i = 1; i <= n; i++) {
  if (indegrees[i] === 0) heap.push(i);
}

while (!heap.isEmpty()) {
  const top = heap.pop();
  answer.push(top);
  for (let node of graph[top]) {
    indegrees[node]--;
    if (indegrees[node] === 0) heap.push(node);
  }
}

console.log(answer.join(" "));

// https://jason9319.tistory.com/93

// 문제를 푼 상황에서 다음에 가장 빨리 올 수 있는 문제를 풀어야 하기에 우선순위 큐를 사용
// 4 2
// 4 2
// 3 1
// 3을 하고 4가 아닌 1을 해야 함

// 우선순위 큐 구현의 문제였다
