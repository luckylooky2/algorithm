// 카드 정렬하기 : 우선순위 큐, 그리디
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => parseInt(v, 10));

const ROOT = 1;

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
    let tmp;
    // 루트에 도달할 때까지
    while (parent !== 0) {
      if (this.#heap[parent] >= v) {
        // swap
        tmp = this.#heap[parent];
        this.#heap[parent] = this.#heap[curr];
        this.#heap[curr] = tmp;
      }
      curr = parent;
      parent = Math.floor(parent / 2);
    }
  };

  pop = () => {
    if (this.size === 0) return;
    if (this.size === 1) this.#heap.pop();
    else this.#heap[ROOT] = this.#heap.pop();
    this.size--;
    let curr = ROOT;
    let left = curr * 2;
    let right = left + 1;
    let tmp;
    let isLeftSmall = true;
    // 자식 노드가 하나도 없을 때까지
    while (this.#heap[left] !== undefined) {
      // 오른쪽 자식 노드가 있는 경우
      if (this.#heap[right] !== undefined) {
        // 여기서 else 문을 주지 않아서 모든 경우의 수를 처리할 수 없었음
        if (this.#heap[left] < this.#heap[right]) isLeftSmall = true;
        else isLeftSmall = false;
      }
      if (this.#heap[curr] > this.#heap[isLeftSmall ? left : right]) {
        // swap
        tmp = this.#heap[isLeftSmall ? left : right];
        this.#heap[isLeftSmall ? left : right] = this.#heap[curr];
        this.#heap[curr] = tmp;
      }
      curr = isLeftSmall ? left : right;
      left = curr * 2;
      right = left + 1;
    }
  };

  top = () => this.#heap[this.size === 0 ? 0 : 1];

  print = () => {
    console.log(this.#heap);
  };
}

const n = arr.shift();
let answer = 0;
const heap = new MinHeap();

for (let value of arr) {
  heap.push(value);
}

while (heap.size !== 1) {
  const first = heap.top();
  heap.pop();
  const second = heap.top();
  heap.pop();
  const total = first + second;
  answer += total;
  heap.push(total);
}

console.log(answer);
