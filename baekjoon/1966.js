// 프린터 큐 : 큐, 우선순위 큐, 시뮬레이션, 정렬
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const n = arr.shift()[0];
const answer = [];

class MaxHeap {
  constructor() {
    this.heap = [null];
    this.size = 0;
  }

  add = (v) => {
    this.heap.push(v);
    this.size++;
    let curr = this.heap.length - 1;
    let parent = Math.floor(curr / 2);
    let tmp = 0;
    while (curr !== 1) {
      if (this.heap[curr] > this.heap[parent]) {
        tmp = this.heap[curr];
        this.heap[curr] = this.heap[parent];
        this.heap[parent] = tmp;
      }
      curr = parent;
      parent = Math.floor(parent / 2);
    }
  };

  delete = () => {
    let result = null;
    if (this.size === 0) return result;
    if (this.size === 1) result = this.heap.pop();
    else {
      result = this.heap[1];
      this.heap[1] = this.heap.pop();
    }
    this.size--;
    let curr = 1;
    let leftChild = curr * 2;
    let rightChild = leftChild + 1;
    let isLeftBig = true;
    let tmp = 0;
    while (this.heap[leftChild] !== undefined) {
      if (this.heap[rightChild] !== undefined) {
        if (this.heap[leftChild] < this.heap[rightChild]) isLeftBig = false;
        else isLeftBig = true;
      }
      if (this.heap[curr] < this.heap[isLeftBig ? leftChild : rightChild]) {
        tmp = this.heap[curr];
        this.heap[curr] = this.heap[isLeftBig ? leftChild : rightChild];
        this.heap[isLeftBig ? leftChild : rightChild] = tmp;
      }
      curr = isLeftBig ? leftChild : rightChild;
      leftChild = curr * 2;
      rightChild = leftChild + 1;
    }
    return result;
  };

  print = () => {
    console.log(this.heap);
  };
}

while (arr.length !== 0) {
  const [n, m] = arr.shift();
  const queue = arr.shift();
  let index = 0;
  const target = queue[m];
  const heap = new MaxHeap();
  let result = 1;
  let flag = false;
  // 최대 힙에 저장
  queue.map((v) => heap.add(v));
  while (heap.size !== 0) {
    const deleted = heap.delete();
    while (true) {
      if (queue[index] === deleted) {
        if (deleted === target && m === index) {
          answer.push(result);
          flag = true;
          break;
        }
        queue[index] = -1;
        result++;
        break;
      }
      index = index === queue.length - 1 ? 0 : index + 1;
    }
    if (flag) break;
  }
}

console.log(answer.join("\n"));
