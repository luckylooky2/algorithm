// 택배 배송 : 최단 경로, 다익스트라
const input = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, m] = input.shift();
const edges = input;
const shortest = new Array(n + 1).fill(Infinity);
// connected 2차원 배열 메모리 초과 (50000 * 50000)
const connected = new Array(n + 1).fill(null).map(() => new Object());
const convertKeyTypeToNumber = ([k, v]) => [Number(k), v];

shortest[1] = 0;

for (const [start, end, cost] of edges) {
  const prev = connected[start][end] === undefined ? Infinity : connected[start][end];
  const min = Math.min(prev, cost);
  connected[start][end] = min;
  connected[end][start] = min;
}

class MinHeap {
  constructor() {
    this.arr = [null];
    this.size = 0;
  }

  push(arr) {
    this.arr.push(arr);
    this.size++;

    let curr = this.size;
    let parent = Math.floor(this.size / 2);

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
      return;
    }
    if (this.size === 1) {
      this.arr.pop();
      this.size--;
      return;
    }
    const popped = this.arr.pop();
    let curr = 1;
    let left = curr * 2;
    let right = left + 1;

    this.arr[1] = popped;
    while (true) {
      if (this.arr[left] === undefined) {
        break;
      } else if (this.arr[right] === undefined) {
        // left와 비교
        if (this.arr[curr][2] > this.arr[left][2]) {
          [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
        }
        curr = left;
        left = curr * 2;
        right = left + 1;
      } else {
        // left, right와 비교
        const isLeftSmall = this.arr[right][2] > this.arr[left][2];
        if (isLeftSmall) {
          if (this.arr[curr][2] > this.arr[left][2]) {
            [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
          }
        } else {
          if (this.arr[curr][2] > this.arr[right][2]) {
            [this.arr[curr], this.arr[right]] = [this.arr[right], this.arr[curr]];
          }
        }
        curr = isLeftSmall ? left : right;
        left = curr * 2;
        right = left + 1;
      }
    }
    this.size--;
  }

  top() {
    return this.size <= 0 ? null : this.arr[1];
  }
}

const minHeap = new MinHeap();

for (const [end, cost] of Object.entries(connected[1]).map(convertKeyTypeToNumber)) {
  if (connected[1][end] !== undefined) {
    minHeap.push([1, end, cost]);
  }
}

while (minHeap.size) {
  const [start, end, cost] = minHeap.top();

  minHeap.pop();
  console.log(start, end, cost, shortest[end], cost);
  if (shortest[end] > cost + shortest[start]) {
    // 확정이 되는 시점에 어떻게 모든 경우를 탐색했다고 확신할 수 있는가?
    shortest[end] = cost + shortest[start];
    for (const [nextEnd, nextCost] of Object.entries(connected[end]).map(convertKeyTypeToNumber)) {
      const prev = shortest[end];
      // 연결된 것 중에 이미 최소값이 정해진 것은 제외
      if (nextCost !== Infinity && shortest[nextEnd] === Infinity) {
        minHeap.push([start, nextEnd, nextCost]);
      }
    }
  }

  console.log(minHeap.arr, shortest);
}

console.log(shortest[n]);

// 5 5
// 1 2 1
// 1 3 2
// 2 4 1
// 4 5 1
// 3 5 0

// 1 -> 2 -> 4 -> 5: 3
// 1 -> 3 -> 5: 2

// 오답: 현재 선택한 간선의 값 비교
// [ null, [ 2, 4, 1 ], [ 1, 3, 2 ] ]	  [ Infinity, 0, 1, Infinity, Infinity, Infinity ]
// [ null, [ 4, 5, 1 ], [ 1, 3, 2 ] ]	  [ Infinity, 0, 1, Infinity, 2, Infinity ]
// [ null, [ 5, 3, 0 ], [ 1, 3, 2 ] ]	  [ Infinity, 0, 1, Infinity, 2, 3 ]
// [ null, [ 1, 3, 2 ] ]				        [ Infinity, 0, 1, 3, 2, 3 ]
// [ null ]								              [ Infinity, 0, 1, 2, 2, 3 ]
// - 1 -> 2 -> 4 -> 5가 먼저 저장되고, 1 -> 3 -> 5에서 1 -> 3이 새로 업데이트될 때, 1 -> 3 -> 5가 업데이트되지 않는 문제
// - 1 -> 3: 3에서 2로 업데이트 함에따라 이 경로를 사용하는 다른 경로도 최신화되어야 하는데 그렇지 않음
// - 업데이트를 해준다면 상관없지만, 아래 방법을 사용하면 업데이트 과정이 필요없이 문제를 해결할 수 있음

// 정답: 현재까지의 최소값 + 현재 선택한 간선의 값 비교
// [ null, [ 1, 3, 2 ], [ 1, 4, 2 ] ]	  [ Infinity, 0, 1, Infinity, Infinity, Infinity ]
// [ null, [ 1, 4, 2 ], [ 1, 5, 2 ] ]	  [ Infinity, 0, 1, 2, Infinity, Infinity ]
// [ null, [ 1, 5, 2 ], [ 1, 5, 3 ] ]	  [ Infinity, 0, 1, 2, 2, Infinity ]
// [ null, [ 1, 5, 3 ] ]		      		  [ Infinity, 0, 1, 2, 2, 2 ]
// [ null ]							            	  [ Infinity, 0, 1, 2, 2, 2 ]
// - start를 사용하지 않기 때문에 모두 1로 생각해도 됨
// - 모든 경우의 수를 다 고려하기 떄문에 [4, 5, 3]이 [3, 5, 2]에 의해 적용되지 않게 됨
// - 정점이 선택되면, 해당 정점까지의 최단 경로가 확정됨(처음 Infinity에서 값이 할당될 때가 최단 경로임이 확정)
// - 확정 당시에 다른 돌아오는 길이 있더라도, 음수가 아니라면 현재 길이 다른 길보다 작거나 같음
// - *확정된 것들 중에서 제일 작은 간선을 더한 것은 반드시 최단 경로라는 것을 보장할 수 있기 때문*
// - 즉, 큐에서 꺼낸 정점은 더 이상 갱신될 필요가 없는 최단 경로를 가진 정점

// 우선순위 큐에서 비교해야 하는 값은 현재 선택한 간선의 값이 아니라 "현재까지의 최소값 + 현재 선택한 간선의 값"
// - 즉, "누적된 경로 비용"을 관리해야 함
// - why? 정확한 누적 비용을 추적하여 최단 경로를 결정하기 위해서
// - 누적 비용을 사용하지 않으면 전체 경로의 비용이 무시되고, 부분 경로만을 기준으로 최단 경로를 판단
