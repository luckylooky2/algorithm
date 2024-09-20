// 맥주 마시면서 걸어가기 : 그래프, 너비 우선 탐색, 다익스트라
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const t = +input[0];
let idx = 1;
const COMPARE = 2;
const answer = [];

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
      if (this.arr[curr][COMPARE] < this.arr[parent][COMPARE]) {
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
    let ret = this.arr[1];
    let curr = 1;
    let left = curr * 2;
    let right = left + 1;

    this.arr[1] = this.arr.pop();
    this.size--;
    while (true) {
      if (this.arr[left] === undefined) {
        break;
      }
      // 왼쪽만 있을 때
      else if (this.arr[right] === undefined) {
        if (this.arr[left][COMPARE] < this.arr[curr][COMPARE]) {
          [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
        }
        curr = left;
        left = curr * 2;
        right = left + 1;
      }
      // 둘 다 있을 떄
      else {
        const isLeftSmall = this.arr[left][COMPARE] < this.arr[right][COMPARE];
        if (isLeftSmall) {
          if (this.arr[left][COMPARE] < this.arr[curr][COMPARE]) {
            [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
          }
        } else {
          if (this.arr[right][COMPARE] < this.arr[curr][COMPARE]) {
            [this.arr[curr], this.arr[right]] = [this.arr[right], this.arr[curr]];
          }
        }
        curr = isLeftSmall ? left : right;
        left = curr * 2;
        right = left + 1;
      }
    }

    return ret;
  }
}

function countDistance(nodes) {
  const distance = new Array(nodes.length).fill(null).map(() => new Array(nodes.length).fill(0));

  for (let i = 0; i < nodes.length; i++) {
    const [startX, startY] = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const [endX, endY] = nodes[j];
      const dist = Math.abs(startX - endX) + Math.abs(startY - endY);
      distance[i][j] = dist > 1000 ? 0 : dist;
      distance[j][i] = dist > 1000 ? 0 : dist;
    }
  }

  return distance;
}

function dijkstra(nodes, distance) {
  const heap = new Heap();
  const visited = new Array(nodes.length).fill(Infinity);
  visited[0] = 0;

  // 0에서 시작
  for (let i = 1; i < nodes.length; i++) {
    if (distance[0][i] === 0) {
      continue;
    }
    heap.push([0, i, distance[0][i]]);
  }

  while (heap.size) {
    const [start, end, dist] = heap.pop();
    // 최단 거리를 최신화하는 경우에만 연결된 정점을 우선순위 큐에 push
    // - 그렇지 않으면 과도하게 메모리를 사용
    if (visited[end] > dist) {
      visited[end] = dist;
      // 여기서 우선순위 큐에 추가?
      // - 조건문 밖에서 추가하게 되면 필요하지 않은 부분까지 추가하게 된다
      // - 메모리 초과가 발생한 이유
      for (let i = 0; i < nodes.length; i++) {
        if (distance[end][i] === 0 || visited[i] !== Infinity) {
          continue;
        }

        heap.push([start, i, visited[end] + distance[end][i]]);
      }
    }
  }

  return visited[nodes.length - 1] === Infinity ? "sad" : "happy";
}

while (idx < input.length) {
  const cvsNum = +input[idx++];
  const house = input[idx++].split(" ").map((v) => +v);
  const cvsList = [];
  for (let i = 0; i < cvsNum; i++) {
    cvsList.push(input[idx++].split(" ").map((v) => +v));
  }
  const target = input[idx++].split(" ").map((v) => +v);
  const nodes = [house, ...cvsList, target];
  const distance = countDistance(nodes);

  answer.push(dijkstra(nodes, distance));
}

console.log(answer.join("\n"));

// 모든 편의점을 거쳐서 target에 도착할 수 있는가?
// 단, 모든 간선은 길이가 1000 이하여야 한다

// 편의점의 순서를 정해야 하는가?
// 각각의 정점 간의 거리를 직접 구해야 하는가?

// Try 1: 다익스트라
// - 모든 정점 사이에 거리를 구한 후, 1000이 넘는 간선을 0으로 만들어서 갈 수 없도록 만듦
// - 0부터 마지막 정점까지 가는 최단 거리 유무로 정답을 구함

// 거리가 1000이 넘는 간선을 0으로 만들고 나서 첫 점과 끝 점이 연결되는 지만 확인하면 됨
// 거리를 구하는 것이 아니기 때문에 다익스트라는 불필요
