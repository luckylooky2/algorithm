// 최소 회의실 개수 : 우선순위 큐, 정렬, 스위핑, 그리디
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
let idx = 0;
const n = +input[idx++];
const classes = [];

for (let i = 0; i < n; i++) {
  classes.push(input[idx++].split(" ").map((v) => +v));
}

const sortedClass = classes.slice().sort((a, b) => a[0] - b[0]);

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
      // 현재가 부모보다 작으면 swap: 작은 것이 위로 올라가야 한다
      if (this.arr[curr] < this.arr[parent]) {
        [this.arr[curr], this.arr[parent]] = [this.arr[parent], this.arr[curr]];
      }
      curr = parent;
      parent = Math.floor(curr / 2);
    }
  }

  pop() {
    if (this.size === 1) {
      this.size--;
      return this.arr.pop();
    } else if (this.size === 0) {
      return null;
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
        // 왼쪽이 부모보다 작으면 swap: 작은 것이 위로 올라가야 한다
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
          curr = left;
        } else {
          if (this.arr[curr] > this.arr[right]) {
            [this.arr[curr], this.arr[right]] = [
              this.arr[right],
              this.arr[curr],
            ];
          }
          curr = right;
        }
        left = curr * 2;
        right = left + 1;
      }
    }
    return result;
  }
}

let answer = 0;

const pq = new Heap();

for (const [start, end] of sortedClass) {
  while (pq.size && pq.arr[1] <= start) {
    pq.pop();
  }
  pq.push(end);
  answer = Math.max(answer, pq.size);
}

// 스위핑?
// - 꽃 문제와 비슷하게 풀어보기
