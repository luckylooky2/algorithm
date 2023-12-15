// 문제집 : 우선순위 큐, 그래프, 위상 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, m] = input.shift();
const edges = input;
const graph = {};
const answer = [];
const indegrees = new Array(n + 1).fill(0);

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
    // 루트에 도달할 때까지
    while (parent !== 0) {
      if (this.#heap[parent] >= v)
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
    // 자식 노드가 하나도 없을 때까지
    while (this.#heap[left] !== undefined) {
      // 오른쪽 자식 노드가 있는 경우
      if (this.#heap[right] !== undefined) {
        // 여기서 else 문을 주지 않아서 모든 경우의 수를 처리할 수 없었음
        if (this.#heap[left] < this.#heap[right]) isLeftSmall = true;
        else isLeftSmall = false;
      }
      // isLeftSmall 변수가 반복문 밖에 있으므로 반복문이 돌 때마다 true로 초기화가 되지 않음
      // 이전에 isLeftSmall = false일 수도 있으므로, 오른쪽 자식이 없다면 isLeftSmall을 반드시 설정해주어야 함
      else isLeftSmall = true;

      if (this.#heap[curr] > this.#heap[isLeftSmall ? left : right])
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

const heap = new MinHeap();

for (let i = 1; i <= n; i++) graph[i] = [];

for (let [from, to] of edges) {
  graph[from].push(to);
  indegrees[to]++;
}

for (let i = 1; i <= n; i++) {
  if (indegrees[i] === 0) heap.push(i);
}

while (heap.size !== 0) {
  const top = heap.top();
  heap.pop();
  answer.push(top);
  for (let node of graph[top]) {
    indegrees[node]--;
    if (indegrees[node] === 0) heap.push(node);
  }
}

console.log(answer.join(" "));

// https://jason9319.tistory.com/93

// 문제를 푼 상황에서 다음에 가장 빨리 올 수 있는 문제를 풀어야 하기에 우선순위 큐를 사용
// 4 2
// 4 2
// 3 1
// 3을 하고 4가 아닌 1을 해야 함

// 우선순위 큐 구현의 문제?

// 일단 문제를 잘못 이해
// 1. 1부터 n까지 i를 순서대로 연결된 노드를 먼저 처리하고 i를 처리하는 방법(단순 bfs)
// 3 2
// 3 1
// 2 3
// 답이 [2, 3, 1]이 되어야 하는데 [3, 1, 2]가 나옴
// 현재 노드를 기준으로 단순히 연결된 노드를 방문하는 것이므로 그리디적 성격을 띄고 있음
// 3을 큐에 넣기 전에 3보다 더 먼저 처리해야 하는 노드가 있는지 확인해야 함
// indegrees를 사용하지도 않았으므로 위상 정렬도 아니고 단순 bfs
// cf> bfs와 위상 정렬의 차이 : bfs는 순서와 관련없이 주변 노드를 탐색하지만, 위상 정렬은 indegrees에 의해 차례대로 노드를 탐색
// 이 문제에서는 3 전에 2를 먼저 탐색해야 하고, 이를 indegrees를 이용하여 구현

// 2. 위상 정렬은 큐로도 구현할 수 있지만, 우선순위 큐로도 구현할 수 있음
// 두 번째 시도에서는 큐를 사용했기 때문에 틀림
// 큐 : 큐에 추가되는 노드들 사이에 상대적인 순서가 불필요하거나 모호한 경우에 적합(더 일반적인 경우)
// 우선순위 큐 : 큐에 추가되는 노드들 사이에 상대적인 순서가 중요하거나 특별한 우선순위를 갖는 경우에 적합
// 이 문제에셔는 3. 가능하면 쉬운 문제부터 풀어야 한다는 조건이 있기 때문에 큐에 추가되는 노드들 사이에 순서가 정해짐
// e.g. 만약 큐에 3만 있더라도 1이 큐에 추가되는 경우 3보다 1을 먼저 처리되어야 함

// 3. 우선순위 큐 구현 이슈
// 지금까지 우선순위 큐를 구현했던 것이 문제가 있었던 것은 아니었고, 최근에 우선순위 큐를 구현할 때 잘못 구현했던 것이 남아있어서 발생했던 문제
// - isLeftSmall이 반복문 밖에서 정의가 되어있어서 반복문이 돌 때마다 true로 초기화가 안 되었던 것이 문제
// - swap 표현 교체 : [a, b] = [b, a]
