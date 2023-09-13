const ROOT = 1;

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

const heap = new MinHeap();
[10, 20, 5, 12, 40, 80].map((v) => heap.insert(v));
heap.print();
console.log(heap.size);
heap.delete();
heap.delete();
heap.print();
console.log(heap.size);
