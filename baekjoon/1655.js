// 가운데를 말해요
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => parseInt(v, 10));
const n = arr.shift();
const answer = [];
const ROOT = 1;

class MaxHeap {
  #heap;
  constructor() {
    this.#heap = [null];
    this.size = 0;
  }

  insert = (v) => {
    this.#heap.push(v);
    this.size++;
    let parent = Math.floor(this.size / 2);
    let curr = this.size;
    let tmp;
    // 루트에 도달할 때까지
    while (parent !== 0) {
      if (this.#heap[parent] < v) {
        // swap
        tmp = this.#heap[parent];
        this.#heap[parent] = this.#heap[curr];
        this.#heap[curr] = tmp;
      }
      curr = parent;
      parent = Math.floor(parent / 2);
    }
  };

  delete = () => {
    if (!this.size) return;
    if (this.size === 1) this.#heap.pop();
    else this.#heap[ROOT] = this.#heap.pop();
    this.size--;
    let curr = ROOT;
    let left = curr * 2;
    let right = left + 1;
    let tmp;
    // 자식 노드가 하나도 없을 때까지
    while (this.#heap[left] !== undefined) {
      let isLeftBig = true;
      // 오른쪽 자식 노드가 없는 경우
      if (!this.#heap[right]) {
        if (this.#heap[curr] > this.#heap[left]) break;
      }
      // 오른쪽 자식 노드가 있는 경우
      else {
        if (
          this.#heap[curr] > this.#heap[left] &&
          this.#heap[curr] > this.#heap[right]
        )
          break;
        if (this.#heap[left] < this.#heap[right]) {
          isLeftBig = false;
        }
      }
      // swap
      tmp = this.#heap[isLeftBig ? left : right];
      this.#heap[isLeftBig ? left : right] = this.#heap[curr];
      this.#heap[curr] = tmp;
      curr = isLeftBig ? left : right;
      left = curr * 2;
      right = left + 1;
    }
  };

  max = () => this.#heap[this.size === 0 ? 0 : 1];

  print = () => {
    console.log(this.#heap);
  };
}

class MinHeap {
  #heap;
  constructor() {
    this.#heap = [null];
    this.size = 0;
  }

  insert = (v) => {
    this.#heap.push(v);
    this.size++;
    let parent = Math.floor(this.size / 2);
    let curr = this.size;
    let tmp;
    // 루트에 도달할 때까지
    while (parent !== 0) {
      if (this.#heap[parent] > v) {
        // swap
        tmp = this.#heap[parent];
        this.#heap[parent] = this.#heap[curr];
        this.#heap[curr] = tmp;
      }
      curr = parent;
      parent = Math.floor(parent / 2);
    }
  };

  delete = () => {
    if (!this.size) return;
    if (this.size === 1) this.#heap.pop();
    else this.#heap[ROOT] = this.#heap.pop();
    this.size--;
    let curr = ROOT;
    let left = curr * 2;
    let right = left + 1;
    let tmp;
    // 자식 노드가 하나도 없을 때까지
    while (this.#heap[left] !== undefined) {
      let isLeftSmall = true;
      // 오른쪽 자식 노드가 없는 경우
      if (!this.#heap[right]) {
        if (this.#heap[curr] < this.#heap[left]) break;
      }
      // 오른쪽 자식 노드가 있는 경우
      else {
        if (
          this.#heap[curr] < this.#heap[left] &&
          this.#heap[curr] < this.#heap[right]
        )
          break;
        if (this.#heap[left] > this.#heap[right]) {
          isLeftSmall = false;
        }
      }
      // swap
      tmp = this.#heap[isLeftSmall ? left : right];
      this.#heap[isLeftSmall ? left : right] = this.#heap[curr];
      this.#heap[curr] = tmp;
      curr = isLeftSmall ? left : right;
      left = curr * 2;
      right = left + 1;
    }
  };

  min = () => this.#heap[this.size === 0 ? 0 : 1];

  print = () => {
    console.log(this.#heap);
  };
}

const minHeap = new MinHeap();
const maxHeap = new MaxHeap();

arr.map((v, i) => {
  if (i % 2) minHeap.insert(v);
  else maxHeap.insert(v);
  if (minHeap.size && maxHeap.size && maxHeap.max() > minHeap.min()) {
    const left = maxHeap.max();
    const right = minHeap.min();
    maxHeap.delete();
    minHeap.delete();
    maxHeap.insert(right);
    minHeap.insert(left);
  }
  answer.push(maxHeap.max());
});

console.log(answer.join("\n"));
