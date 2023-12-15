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
    // 루트에 도달할 때까지
    while (parent !== 0) {
      if (this.#heap[parent] <= v)
        [this.#heap[parent], this.#heap[curr]] = [
          this.#heap[curr],
          this.#heap[parent],
        ];
      curr = parent;
      parent = Math.floor(parent / 2);
    }
  };

  delete = () => {
    if (this.size === 0) return;
    if (this.size === 1) this.#heap.pop();
    else this.#heap[1] = this.#heap.pop();
    this.size--;
    let curr = 1;
    let left = curr * 2;
    let right = left + 1;
    let isLeftBig = true;
    // 자식 노드가 하나도 없을 때까지
    while (this.#heap[left] !== undefined) {
      // 오른쪽 자식 노드가 있는 경우
      if (this.#heap[right] !== undefined) {
        // 여기서 else 문을 주지 않아서 모든 경우의 수를 처리할 수 없었음
        if (this.#heap[left] > this.#heap[right]) isLeftBig = true;
        else isLeftBig = false;
      } else isLeftBig = true;
      if (this.#heap[curr] < this.#heap[isLeftBig ? left : right])
        [this.#heap[curr], this.#heap[isLeftBig ? left : right]] = [
          this.#heap[isLeftBig ? left : right],
          this.#heap[curr],
        ];
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

module.exports = { MaxHeap };
