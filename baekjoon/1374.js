// 강의실 : 정렬, 우선순위 큐
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const sorted = input.sort((a, b) => a[1] - b[1]);

class Heap {
  constructor() {
    this.arr = [null];
    this.size = 0;
  }

  push(number) {
    this.arr.push(number);
    this.size++;

    let curr = this.size;
    let parent = Math.floor(curr / 2);

    while (curr !== 1) {
      // swap
      if (this.arr[curr] < this.arr[parent]) {
        [this.arr[curr], this.arr[parent]] = [this.arr[parent], this.arr[curr]];
      }
      curr = parent;
      parent = Math.floor(parent / 2);
    }
  }

  pop() {
    if (this.size === 0) {
      return null;
    } else if (this.size === 1) {
      this.size--;
      return this.arr.pop();
    }
    this.size--;
    const result = this.arr[1];
    this.arr[1] = this.arr.pop();

    let curr = 1;
    let left = curr * 2;
    let right = left + 1;

    while (true) {
      if (this.arr[left] === undefined) {
        break;
      } else if (this.arr[right] === undefined) {
        if (this.arr[curr] > this.arr[left]) {
          [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
        }
        curr = left;
        left = curr * 2;
        right = left + 1;
      } else {
        const isLeftSmall = this.arr[left] < this.arr[right];
        if (isLeftSmall) {
          if (this.arr[curr] > this.arr[left]) {
            [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
          }
        } else {
          if (this.arr[curr] > this.arr[right]) {
            [this.arr[curr], this.arr[right]] = [this.arr[right], this.arr[curr]];
          }
        }
        curr = isLeftSmall ? left : right;
        left = curr * 2;
        right = left + 1;
      }
    }

    return result;
  }

  top() {
    return this.size ? this.arr[1] : null;
  }
}

let answer = 0;
const heap = new Heap();

for (const [id, start, end] of sorted) {
  while (heap.size) {
    if (heap.top() <= start) {
      heap.pop();
    } else {
      break;
    }
  }
  heap.push(end);
  answer = Math.max(answer, heap.size);
}

console.log(answer);
