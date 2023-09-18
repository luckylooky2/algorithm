// 숫자 카드 : 정렬, 이분 탐색, 해시를 사용한 집합과 맵
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const list = input.shift();
const [m] = input.shift();
const targets = input.shift();
const answer = [];

class MinHeap {
  constructor() {
    this.heap = [null];
    this.size = 0;
  }

  print = () => {
    console.log(this.heap);
  };

  add = (value) => {
    this.heap.push(value);
    this.size++;
    let curr = this.size;
    let parent = Math.floor(this.size / 2);
    let tmp;
    while (curr !== 1) {
      if (this.heap[curr] < this.heap[parent]) {
        tmp = this.heap[curr];
        this.heap[curr] = this.heap[parent];
        this.heap[parent] = tmp;
      }
      curr = parent;
      parent = Math.floor(curr / 2);
    }
  };

  delete = () => {
    let result = 0;
    if (this.size === 0) return;
    result = this.heap[1];
    if (this.size === 1) this.heap.pop();
    else this.heap[1] = this.heap.pop();
    this.size--;
    let curr = 1;
    let leftChild = curr * 2;
    let rightChild = leftChild + 1;
    let isLeftSmall = true;
    let tmp = 0;
    while (this.heap[leftChild] !== undefined) {
      if (this.heap[rightChild] !== undefined) {
        if (this.heap[leftChild] > this.heap[rightChild]) isLeftSmall = false;
        else isLeftSmall = true;
      }
      if (this.heap[curr] > this.heap[isLeftSmall ? leftChild : rightChild]) {
        tmp = this.heap[isLeftSmall ? leftChild : rightChild];
        this.heap[isLeftSmall ? leftChild : rightChild] = this.heap[curr];
        this.heap[curr] = tmp;
      }
      curr = isLeftSmall ? leftChild : rightChild;
      leftChild = curr * 2;
      rightChild = leftChild + 1;
    }
    return result;
  };
}

function bs(target, left, mid, right) {
  if (left === right) return answer.push(target === sorted[left] ? "1" : "0");
  const midLeft = Math.floor((left + mid) / 2);
  const midRight = Math.floor((mid + 1 + right) / 2);
  if (sorted[mid] >= target) bs(target, left, midLeft, mid);
  else bs(target, mid + 1, midRight, right);
}

const minHeap = new MinHeap();
const sorted = [];

// Heap sort
for (let i = 0; i < list.length; i++) minHeap.add(list[i]);
for (let i = 0; i < list.length; i++) sorted.push(minHeap.delete());

targets.map((v) => {
  bs(v, 0, Math.floor((sorted.length - 1) / 2), sorted.length - 1);
});

console.log(answer.join(" "));
