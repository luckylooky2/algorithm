// 지름길 : 다익스트라, 동적 계획법, 최단 경로
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n, d] = input.shift();
const paths = input;
const adjacent = new Map();
const nodes = [0, d];
const distance = {};

for (const [start, end, cost] of paths) {
  // 모든 노드를 저장
  if (!nodes.includes(start)) {
    nodes.push(start);
  }
  if (!nodes.includes(end)) {
    nodes.push(end);
  }
  // 지름길을 map에 저장
  if (adjacent.has(start)) {
    adjacent.get(start).push([end, cost]);
  } else {
    adjacent.set(start, [[end, cost]]);
  }
}

const sorted = nodes.sort((a, b) => a - b);

// 노드를 정렬하여 각각의 노드 사이의 거리를 저장
for (let i = 0; i < sorted.length - 1; i++) {
  const [start, end] = [sorted[i], sorted[i + 1]];
  if (adjacent.has(start)) {
    adjacent.get(start).push([end, end - start]);
  } else {
    adjacent.set(start, [[end, end - start]]);
  }
}

class Heap {
  constructor() {
    this.arr = [null];
    this.size = 0;
  }

  push(arr) {
    this.arr.push(arr);
    this.size++;
    let curr = this.size;
    let parent = Math.floor(curr / 2);
    while (curr !== 1) {
      if (this.arr[curr][2] < this.arr[parent][2]) {
        [this.arr[curr], this.arr[parent]] = [this.arr[parent], this.arr[curr]];
      }
      curr = parent;
      parent = Math.floor(curr / 2);
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
    const res = this.arr[1];
    this.arr[1] = this.arr.pop();
    let curr = 1;
    let left = curr * 2;
    let right = left + 1;

    while (true) {
      if (this.arr[left] === undefined) {
        break;
      } else if (this.arr[right] === undefined) {
        // 부등호 방향이 잘못되어 시간 초과
        if (this.arr[left][2] < this.arr[curr][2]) {
          [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
        }
        curr = left;
      } else {
        const isLeftSmall = this.arr[left][2] < this.arr[right][2];
        if (isLeftSmall) {
          if (this.arr[left][2] < this.arr[curr][2]) {
            [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
          }
        } else {
          if (this.arr[right][2] < this.arr[curr][2]) {
            [this.arr[curr], this.arr[right]] = [
              this.arr[right],
              this.arr[curr],
            ];
          }
        }
        curr = isLeftSmall ? left : right;
      }
      left = curr * 2;
      right = left + 1;
    }
    return res;
  }
}

// 다익스트라
const pq = new Heap();

for (const [end, cost] of adjacent.get(0)) {
  pq.push([0, end, cost]);
}

while (pq.size) {
  const [start, end, cost] = pq.pop();
  if (distance[end] === undefined || distance[end] > cost) {
    distance[end] = cost;
    const list = adjacent.get(end);
    if (list) {
      for (const [next, value] of list) {
        pq.push([end, next, cost + value]);
      }
    }
  }
}

console.log(distance[d]);
