// 특정한 최단 경로 : 최단 경로, 다익스트라, 그래프
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
let idx = 0;
const [n, e] = input[idx++];
const edges = [];
for (let i = 0; i < e; i++) {
  edges.push(input[idx++]);
}
const [v1, v2] = input[idx];
// (공간 복잡도 측면) 노드의 수가 충분히 클 때, 인접 배열을 사용
// (시간 복잡도 측면) 연결된 간선의 수가 적을 때, 인접 배열을 사용
const adjacentArray = new Array(n + 1).fill(null).map(() => new Array(0));
// (공간 복잡도 측면) 노드의 수가 충분히 적을 때, 인접 행렬을 사용
// (시간 복잡도 측면) 연결된 간선의 수가 많을 때, 인접 행렬을 사용
const adjacentMatrix = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(Infinity));

for (const [start, end, cost] of edges) {
  adjacentArray[start].push([end, cost]);
  adjacentArray[end].push([start, cost]);
  adjacentMatrix[start][end] = cost;
  adjacentMatrix[end][start] = cost;
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
      if (this.arr[curr][1] < this.arr[parent][1]) {
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
    const ret = this.arr[1];
    this.arr[1] = this.arr.pop();
    let curr = 1,
      left = curr * 2,
      right = left + 1;
    while (true) {
      if (this.arr[left] === undefined) {
        break;
      } else if (this.arr[right] === undefined) {
        if (this.arr[curr][1] > this.arr[left][1]) {
          [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
        }
        curr = left;
      } else {
        const isLeftSmall = this.arr[left][1] < this.arr[right][1];
        if (isLeftSmall) {
          if (this.arr[curr][1] > this.arr[left][1]) {
            [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
          }
          curr = left;
        } else {
          if (this.arr[curr][1] > this.arr[right][1]) {
            [this.arr[curr], this.arr[right]] = [this.arr[right], this.arr[curr]];
          }
          curr = right;
        }
      }
      left = curr * 2;
      right = left + 1;
    }
    return ret;
  }
}

function dijkstraArray(startNode) {
  const shortest = new Array(n + 1).fill(Infinity);
  shortest[startNode] = 0;

  const pq = new Heap();

  pq.push([startNode, 0]);

  while (pq.size) {
    const [end, cost] = pq.pop();

    // 같을 때에도 업데이트를 해야 한다.
    if (shortest[end] < cost) {
      continue;
    }

    for (const [next, nextCost] of adjacentArray[end]) {
      // 최종 비용을 기준으로 한다.
      const updateCost = cost + nextCost;
      // 모든 경우를 추가하는 것이 아니라, 업데이트할 수 있는 경우만 추가한다.
      // - 모든 경우를 추가하면 불필요한 경우까지 처리하므로 훨씬 느려진다.
      if (updateCost >= shortest[next]) {
        continue;
      }
      // 뽑은 다음에 visit을 하게 되면 중복이 발생한다.
      // - bfs처럼 추가하기 전에 visit 체크를 해 준다.
      shortest[next] = updateCost;
      pq.push([next, updateCost]);
    }
  }

  return shortest;
}

function dijkstraMatrix(startNode) {
  const shortest = new Array(n + 1).fill(Infinity);
  const visit = new Array(n + 1).fill(false);
  shortest[startNode] = 0;

  for (let i = 1; i <= n; i++) {
    let min = Infinity;
    let minIndex = -1;
    for (let j = 1; j <= n; j++) {
      if (!visit[j] && shortest[j] < min) {
        min = shortest[j];
        minIndex = j;
      }
    }

    if (minIndex === -1) {
      break;
    }
    visit[minIndex] = true;

    for (let j = 1; j <= n; j++) {
      if (!visit[j] && adjacentMatrix[minIndex][j] !== Infinity) {
        shortest[j] = Math.min(shortest[j], shortest[minIndex] + adjacentMatrix[minIndex][j]);
      }
    }
  }
  return shortest;
}

const [s1, sv1, sv2] = [dijkstraArray(1), dijkstraArray(v1), dijkstraArray(v2)];
const first = s1[v1] + sv1[v2] + sv2[n];
const second = s1[v2] + sv2[v1] + sv1[n];
const answer = Math.min(first, second);
console.log(answer === Infinity ? -1 : answer);

// 인접 배열을 사용한 다익스트라는, 간선이 많은 밀집 그래프에서 시간이 많이 소요될 수 있다.
// 인접 행렬을 사용한 다익스트라는, 모든 노드 간의 연결을 저장하므로 공간을 많이 사용할 수 있다.

// 인접 배열 다익스트라 구현이 비효율적이었다.
// - 1. shortest[end] < cost인 경우는 모두 넘겨도 된다.
// - 2. bfs처럼 큐에 추가하기 전에 업데이트를 한다.
