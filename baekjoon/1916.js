// 최소비용 구하기 : 최단 거리, 다익스트라, 그래프
const input = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input[0];
const [m] = input[1];
const costInput = input.slice(2, 2 + m);
const [from, to] = input[2 + m];

// ***floyd-warshall : "모든 정점"으로부터 다른 모든 정점 사이의 최단 거리***
// - _음수인 간선_이 있어도 사용 가능
// - cf> 음수의 사이클이 있으면 사용하지 못함
// - 이 문제에서는 시간 초과

// ***dijkstra : "하나의 시작점"으로부터 다른 모든 정점까지의 최단 거리***
// - O(nlogn + m)
// - 모든 정점 쌍 사이의 최단 거리를 구하기 위해서는 O(n * (nlogn + m)) => 최악의 경우 O(n^3)
// - 두 알고리즘이 쓰이는 곳이 각각 다름
// - cf> _음수인 간선_이 있으면 사용하지 못함 => bellman-ford

// 매 단계마다 도달할 수 있는 정점 중에서, 시작점으로부터의 거리가 가장 가까운 정점을 구해서 그 거리를 확정

const shortest = new Array(n + 1).fill(Infinity);
shortest[from] = 0;

const connencted = new Array(n + 1).fill(null).map(() => new Array(0));

for (const [start, end, cost] of costInput) {
  connencted[start].push([end, cost]);
}

/*

// naive ver.
// - O(n^2) => 노드 개수가 많아지면 시간 초과 발생 가능성

const visited = new Array(n + 1).fill(false);

while (true) {
  let idx = -1;

  // 1. idx 구하기
  for (let i = 1; i <= n; i++) {
    // 이미 방문한 idx 제외
    if (visited[i]) {
      continue;
    }

    // 방문하지 않은 노드 중 가장 작은(즉, 가장 가까운) 노드 선택
    // - 거리가 확정되지 않은 정점 중에서 가장 가까운 정점을 찾아 확정
    // - 일종의 그리디
    if (idx === -1) {
      idx = i;
    } else {
      if (shortest[i] < shortest[idx]) {
        idx = i;
      }
    }
  }

  // 모든 노드를 순회했다면
  if (idx === -1) {
    break;
  }

  // 2. 업데이트 및 확정
  // - 여기서 어떻게 최단 거리라고 확정할 수 있는가?
  // - e.g. [1, 3, 15], [1, 4, 1], [3, 4, 1]인 상황에서 1에서 선택되는 노드가 4로 결정되었다
  // - 확정된 노드가 더 작은 수로 업데이트가 되려면 다른 곳을 거쳐오는 수의 합이 확정된 값보다 더 작아야 하는데, 이런 경우는 거쳐오는 간선이 음수인 경우 밖에 없다
  // - 만약 [1, 3, 1] 이었다고 생각하면, 결정되는 노드는 4가 아니라 3이었어야 한다
  // - **이런 이유로 확정된 노드까지의 거리는 반드시 최단 거리라고 할 수 있다**
  // - 또한, 다익스트라가 왜 음수 간선을 처리할 수 없는지도 유추할 수 있다
  visited[idx] = true;
  for (const [end, cost] of connencted[idx]) {
    shortest[end] = Math.min(shortest[end], cost + shortest[idx]);
  }
}

console.log(shortest[to]);

// minIndex를 선택하는 과정이 달랐음
// - 이전) 현재 노드의 인접 행렬 중 가장 작은 비용을 가진 노드를 선택 => 인접되지 않은 노드가 있다면 계산이 되지 않음
// - 이후) 방문했었지 않은 노드 중 가장 작은(즉, 가장 가까운) 노드 선택

*/

// effective ver.
// - 우선순위 큐 필요

class MinHeap {
  #heap;
  constructor() {
    this.#heap = [null];
    this.size = 0;
  }

  push = (v) => {
    this.#heap.push(v);
    this.size++;
    let parent = Math.floor(this.size / 2);
    let curr = this.size;
    while (parent !== 0) {
      if (this.#heap[parent][1] >= v)
        [this.#heap[parent], this.#heap[curr]] = [
          this.#heap[curr],
          this.#heap[parent],
        ];
      curr = parent;
      parent = Math.floor(parent / 2);
    }
  };

  pop = () => {
    if (this.size === 0) return;
    if (this.size === 1) this.#heap.pop();
    else this.#heap[1] = this.#heap.pop();
    this.size--;
    let curr = 1;
    let left = curr * 2;
    let right = left + 1;
    let isLeftSmall = true;

    while (this.#heap[left] !== undefined) {
      if (this.#heap[right] !== undefined) {
        if (this.#heap[left][1] < this.#heap[right][1]) isLeftSmall = true;
        else isLeftSmall = false;
      } else isLeftSmall = true;
      if (this.#heap[curr][1] > this.#heap[isLeftSmall ? left : right][1])
        [this.#heap[curr], this.#heap[isLeftSmall ? left : right]] = [
          this.#heap[isLeftSmall ? left : right],
          this.#heap[curr],
        ];
      curr = isLeftSmall ? left : right;
      left = curr * 2;
      right = left + 1;
    }
  };

  top = () => this.#heap[this.size === 0 ? 0 : 1];

  isEmpty = () => {
    return this.#heap.length === 1;
  };

  print = () => {
    console.log(this.#heap);
  };
}

// 원소가 배열인 힙으로 교체
const minHeap = new MinHeap();
minHeap.push([from, 0]);

while (!minHeap.isEmpty()) {
  const [node, distance] = minHeap.top();
  minHeap.pop();
  if (shortest[node] !== distance) {
    continue;
  }

  for (const [end, cost] of connencted[node]) {
    // 왜 작은 경우에만 힙에 추가하는가?
    // - 큰 경우에는 어차피 제거되기 때문에 효율성을 위해 넣지 않는다
    if (shortest[end] > shortest[node] + cost) {
      shortest[end] = shortest[node] + cost;
      // cost가 아니라 업데이트된 값 shortest[node] + cost를 우선순위 큐에 저장
      // - 여기서 end 노드까지의 최신화된 최단 거리를 업데이트하는 효과
      // - 더 거리가 큰 힙 내부 요소는 위의 shortest[node] !== distance 조건에 의해 제거됨
      minHeap.push([shortest[node] + cost, end]);
    }
  }
}

console.log(shortest);

// 1) 시간이 급하고 2) 시간 초과 우려가 없으면 naive 버전을 사용하자
// - 그렇기 위해서 두 방법 다 알고 있는 것이 좋겠다
