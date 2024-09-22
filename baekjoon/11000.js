// 강의실 배정 : 정렬, 우선순위 큐, 그리디 알고리즘
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const classes = input;
let answer = 0;

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

const sortedClasses = classes.sort((a, b) => a[0] - b[0]);
const pq = new Heap();

for (const [currStart, currEnd] of sortedClasses) {
  // currStart보다 작은 것 모두 pop
  while (true) {
    const top = pq.top();
    if (top === null) {
      break;
    }
    const end = top;
    if (end <= currStart) {
      pq.pop();
    } else {
      break;
    }
  }
  pq.push(currEnd);
  answer = Math.max(answer, pq.size);
}

console.log(answer);

// 1 <= n <= 200,000
// 1 <= answer <= n

// 1. 시작 시간이 빠른 순서대로 정렬한다
// 2. 하나씩 보면서 현재 시간보다 끝이 먼저인 수업은 제외한다
// - 확인하는 시간이 O(n)이 걸리는데, 이것을 더 효율적인 방법으로 확인해야 한다
// - 우선순위 큐? 현재보다 작은 것 다 뻄
