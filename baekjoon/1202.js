// 보석 도둑
let jewelrys = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

// 우선순위 큐 구현
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
      if (this.#heap[parent] <= v) {
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
    if (this.size === 0) return;
    if (this.size === 1) this.#heap.pop();
    else this.#heap[ROOT] = this.#heap.pop();
    this.size--;
    let curr = ROOT;
    let left = curr * 2;
    let right = left + 1;
    let tmp;
    let isLeftBig = true;
    // 자식 노드가 하나도 없을 때까지
    while (this.#heap[left] !== undefined) {
      // 오른쪽 자식 노드가 있는 경우
      if (this.#heap[right] !== undefined) {
        // 여기서 else 문을 주지 않아서 모든 경우의 수를 처리할 수 없었음
        if (this.#heap[left] > this.#heap[right]) isLeftBig = true;
        else isLeftBig = false;
      }
      if (this.#heap[curr] < this.#heap[isLeftBig ? left : right]) {
        // swap
        tmp = this.#heap[isLeftBig ? left : right];
        this.#heap[isLeftBig ? left : right] = this.#heap[curr];
        this.#heap[curr] = tmp;
      }
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

const cache = {};
const [n, k] = jewelrys.shift();
let bags = [];
let i = 0;
let answer = 0;
const heap = new MaxHeap();
for (let i = 0; i < k; i++) {
  bags.push(jewelrys.pop()[0]);
}
jewelrys = jewelrys.sort((a, b) => a[0] - b[0]);
// multimap : 중복을 고려해야 함
jewelrys.forEach((v) => {
  if (!cache[v[0]]) cache[v[0]] = [v[1]];
  else cache[v[0]].push(v[1]);
});
// 가방 무게가 작은 순서대로 정렬하고 => 그리디(경험적)
bags = bags.sort((a, b) => a - b);
for (let value of bags) {
  // 가방 무게까지 heap에 push
  while (i <= value) {
    if (cache[i]) {
      for (let j = 0; j < cache[i].length; j++) heap.insert(cache[i][j]);
    }
    i++;
  }
  // 그 중에서 최대값을 pop
  answer += heap.max();
  heap.delete();
}

console.log(answer);
