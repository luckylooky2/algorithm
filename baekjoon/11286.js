// 절대값 힙 : 힙, 우선순위 큐
const [n, ...arr] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => parseInt(v, 10));
const answer = [];

class AbsHeap {
  constructor() {
    this.heap = [null];
    this.size = 0;
  }

  add = (value) => {
    this.size++;
    this.heap.push(value);
    let curr = this.size;
    let parent = Math.floor(this.size / 2);
    let tmp = 0;
    while (curr !== 1) {
      const currAbs = Math.abs(this.heap[curr]);
      const parentAbs = Math.abs(this.heap[parent]);
      if (
        currAbs < parentAbs ||
        (currAbs === parentAbs && this.heap[curr] < this.heap[parent])
      ) {
        tmp = this.heap[curr];
        this.heap[curr] = this.heap[parent];
        this.heap[parent] = tmp;
      }
      curr = parent;
      parent = Math.floor(parent / 2);
    }
  };

  delete = () => {
    let ret = 0;

    if (this.size === 0) return null;
    if (this.size === 1) ret = this.heap.pop();
    else {
      ret = this.heap[1];
      this.heap[1] = this.heap.pop();
    }
    this.size--;
    let curr = 1;
    let lChild = curr * 2;
    let rChild = lChild + 1;
    let tmp = 0;
    let isLeftSmall = false;
    while (this.heap[lChild] !== undefined) {
      if (this.heap[rChild] === undefined) isLeftSmall = true;
      else {
        const lChildAbs = Math.abs(this.heap[lChild]);
        const rChildAbs = Math.abs(this.heap[rChild]);
        if (
          lChildAbs < rChildAbs ||
          (lChildAbs === rChildAbs && this.heap[lChild] < this.heap[rChild])
        )
          isLeftSmall = true;
        else isLeftSmall = false;
      }
      const currAbs = Math.abs(this.heap[curr]);
      const childAbs = Math.abs(this.heap[isLeftSmall ? lChild : rChild]);
      if (
        currAbs > childAbs ||
        (currAbs === childAbs &&
          this.heap[curr] > this.heap[isLeftSmall ? lChild : rChild])
      ) {
        tmp = this.heap[curr];
        this.heap[curr] = this.heap[isLeftSmall ? lChild : rChild];
        this.heap[isLeftSmall ? lChild : rChild] = tmp;
      }
      curr = isLeftSmall ? lChild : rChild;
      lChild = curr * 2;
      rChild = lChild + 1;
    }
    return ret;
  };

  print = () => {
    console.log(this.heap);
  };
}

const absHeap = new AbsHeap();

arr.map((v) => {
  if (v !== 0) absHeap.add(v);
  else {
    const ret = absHeap.delete();
    answer.push(ret === null ? 0 : ret);
  }
});

console.log(answer.join("\n"));
