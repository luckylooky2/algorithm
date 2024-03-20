// 최소 힙 : 우선순위 큐
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => Number(v));
const answer = [];

class MinHeap {
  constructor() {
    this.arr = [null];
    this.size = 0;
  }

  push = (value) => {
    this.arr.push(value);
    this.size++;
    let curr = this.size;
    let parent = Math.floor(curr / 2);
    while (curr !== 1) {
      // 최소 힙
      if (this.arr[curr] < this.arr[parent]) {
        [this.arr[curr], this.arr[parent]] = [this.arr[parent], this.arr[curr]];
      }
      curr = parent;
      parent = Math.floor(parent / 2);
    }
  };

  pop = () => {
    if (this.size === 0) {
      return;
    }
    this.arr[1] = this.arr.at(-1);
    this.arr.pop();
    this.size--;
    let parent = 1;
    let leftChild = parent * 2;
    let rightChild = leftChild + 1;
    while (this.arr[leftChild] !== undefined) {
      if (this.arr[rightChild] !== undefined) {
        let isLeftSmall = this.arr[leftChild] < this.arr[rightChild];
        if (isLeftSmall) {
          // if 문을 빼먹음
          if (this.arr[parent] > this.arr[leftChild]) {
            [this.arr[leftChild], this.arr[parent]] = [
              this.arr[parent],
              this.arr[leftChild],
            ];
          }
        } else {
          // if 문을 빼먹음
          if (this.arr[parent] > this.arr[rightChild]) {
            [this.arr[rightChild], this.arr[parent]] = [
              this.arr[parent],
              this.arr[rightChild],
            ];
          }
        }
        parent = isLeftSmall ? leftChild : rightChild;
        leftChild = parent * 2;
        rightChild = leftChild + 1;
      } else if (this.arr[leftChild] !== undefined) {
        if (this.arr[parent] > this.arr[leftChild]) {
          [this.arr[leftChild], this.arr[parent]] = [
            this.arr[parent],
            this.arr[leftChild],
          ];
        }
        parent = leftChild;
        leftChild = parent * 2;
        rightChild = leftChild + 1;
      }
    }
  };

  top = () => (this.size === 0 ? null : this.arr.at(1));

  print = () => {
    console.log(this.arr.filter((v, i) => i !== 0).join(" "), this.size);
  };
}

const heap = new MinHeap();

for (let i = 1; i < input.length; i++) {
  const elem = input[i];
  if (elem === 0) {
    const top = heap.top();
    if (top === null) {
      answer.push(0);
    } else {
      answer.push(top);
    }
    heap.pop();
  } else {
    heap.push(elem);
  }
}

console.log(answer.join("\n"));
