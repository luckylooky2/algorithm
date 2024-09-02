// 도로검문 : 그래프, 다익스트라, 최단 경로, 경로 추적
const input = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n, m] = input.shift();
const edges = input.sort((a, b) => a[0] - b[0]);
let tracking = [];
const COMPARE_INDEX = 2;

class MinHeap {
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
      if (this.arr[curr][COMPARE_INDEX] < this.arr[parent][COMPARE_INDEX]) {
        [this.arr[curr], this.arr[parent]] = [this.arr[parent], this.arr[curr]];
      }
      curr = parent;
      parent = Math.floor(parent / 2);
    }
  }

  pop() {
    if (this.size === 0) {
      return;
    } else if (this.size === 1) {
      this.arr.pop();
      this.size--;
      return;
    }
    this.arr[1] = this.arr[this.size];
    this.arr.pop();
    let curr = 1;
    let left = curr * 2;
    let right = left + 1;

    while (true) {
      if (this.arr[left] === undefined) {
        break;
      } else if (this.arr[right] === undefined) {
        if (this.arr[curr][COMPARE_INDEX] > this.arr[left][COMPARE_INDEX]) {
          [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
        }
        curr = left;
        left = curr * 2;
        right = left + 1;
      } else {
        const isLeftSmall =
          this.arr[left][COMPARE_INDEX] < this.arr[right][COMPARE_INDEX];
        if (isLeftSmall) {
          if (this.arr[curr][COMPARE_INDEX] > this.arr[left][COMPARE_INDEX]) {
            [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
          }
          curr = left;
        } else {
          if (this.arr[curr][COMPARE_INDEX] > this.arr[right][COMPARE_INDEX]) {
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
    this.size--;
  }

  top() {
    return this.arr[this.size === 0 ? 0 : 1];
  }
}

// 다익스트라 알고리즘 시간 복잡도
// - (V + E) * logV
// - (1,000 + 5,000) * log1,000 = 60,000
// - 모든 간선을 하나씩 순회하면(브루트 포스), 60,000 * 5,000 = 300,000,000 (시간 초과)

const adjacent = new Array(n + 1).fill(null).map(() => new Array(0));

for (let i = 0; i < edges.length; i++) {
  const [start, end, cost] = edges[i];
  adjacent[start].push([end, cost]);
  adjacent[end].push([start, cost]);
}

function solve() {
  const shortest = new Array(n + 1).fill(Infinity);
  const prev = new Array(n + 1).fill(0);
  const minHeap = new MinHeap();

  shortest[1] = 0;
  for (const [end, cost] of adjacent[1]) {
    minHeap.push([1, end, cost]);
  }

  // 다익스트라
  while (minHeap.size) {
    // 우선순위 큐에서 누적
    const [start, end, cost] = minHeap.top();
    minHeap.pop();
    // 최단 거리를 업데이트할 수 있으면
    if (shortest[end] > cost) {
      // 업데이트
      shortest[end] = cost;
      // 현재 업데이트한 끝 정점의 이전 배열에 시작 정점을 저장
      prev[end] = start;
      // 인접 배열 순회
      for (const [nextEnd, nextCost] of adjacent[end]) {
        const prevCost = shortest[end];
        // 제외된 간선 및 최단 거리 확정 노드 제외
        if (nextCost === Infinity || shortest[nextEnd] !== Infinity) {
          continue;
        }
        minHeap.push([end, nextEnd, prevCost + nextCost]);
      }
    }
  }

  if (tracking.length === 0) {
    const arr = [n];
    let idx = n;

    while (idx !== 1) {
      arr.push(prev[idx]);
      idx = prev[idx];
    }
    tracking = arr.reverse();
  }
  return shortest[n];
}

const least = solve();
let max = 0;

for (let i = 0; i < tracking.length - 1; i++) {
  const [first, second] = [tracking[i], tracking[i + 1]];
  let offset1, offset2;
  let stored;

  for (let j = 0; j < adjacent[first].length; j++) {
    const [end, cost] = adjacent[first][j];
    if (end === second) {
      stored = cost;
      adjacent[first][j][1] = Infinity;
      offset1 = [first, j];
    }
  }
  for (let j = 0; j < adjacent[second].length; j++) {
    const [end, cost] = adjacent[second][j];
    if (end === first) {
      adjacent[second][j][1] = Infinity;
      offset2 = [second, j];
    }
  }
  max = Math.max(max, solve());
  if (max === Infinity) {
    break;
  }
  adjacent[offset1[0]][offset1[1]][1] = stored;
  adjacent[offset2[0]][offset2[1]][1] = stored;
}

console.log(max === Infinity ? -1 : max - least);

// 풀이
// - 다익스트라 알고리즘 구현
// - 간선마다 인덱스를 붙이고 다익스트라 알고리즘 안에서 우선순위 큐에 넣을 때, 제외하는 방식으로 구현
// - => 간선의 가중치를 Infinity로 바꾸는 방법이 더 편할 듯
// - 어떤 간선도 제외하지 않고, 최단 경로의 1) 가중치의 합계와 2) 추적된 경로를 구함
// - 추적된 간선을 순회하며 없을 때의 가중치의 합계를 구함

// 1. 다익스트라 구현이 엉망
// 2. 인덱스 번호를 줘서 제외할 것이 아니라, cost의 값을 Inifinity로 만드는 방법
// 3. adjacent 배열을 map으로 바꾸자
