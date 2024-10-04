// 최단경로 : 그래프, 최단 경로, 다익스트라
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
let idx = 0;
const [v, e] = input[idx++].split(" ").map((v) => +v);
const start = +input[idx++];
const adjacent = new Array(v + 1).fill(null).map(() => new Array(0));
const answer = new Array(v + 1).fill(Infinity);

// 단방향
for (let i = 0; i < e; i++) {
  const [first, second, value] = input[idx++].split(" ").map((v) => +v);
  adjacent[first].push([second, value]);
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
        if (this.arr[left][1] < this.arr[curr][1]) {
          [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
        }
        curr = left;
      } else {
        const isLeftSmall = this.arr[left][1] < this.arr[right][1];
        if (isLeftSmall) {
          if (this.arr[left][1] < this.arr[curr][1]) {
            [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
          }
        } else {
          if (this.arr[right][1] < this.arr[curr][1]) {
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

const pq = new Heap();

for (const [e, dist] of adjacent[start]) {
  pq.push([e, dist]);
}
answer[start] = 0;

while (pq.size !== 0) {
  // start는 굳이 필요없는 정보
  const [e, dist] = pq.pop();
  // 최신화할 수 있다면
  if (answer[e] > dist) {
    answer[e] = dist;
    // 최신화된 정점의 모든 연결된 간선을 순회
    for (const [ne, ndist] of adjacent[e]) {
      if (answer[e] + ndist >= answer[ne]) {
        continue;
      }
      pq.push([ne, answer[e] + ndist]);
    }
  }
}

console.log(
  answer
    .slice(1)
    .map((v) => (v === Infinity ? "INF" : v))
    .join("\n")
);

// 성능 차이: 800ms -> 1100ms
// - heap 구현의 성능 차이는 아님
// - Array 대신 Object를 사용했기 때문

// 왜 중복을 제거한 Object보다 중복을 제거하지 않은 Array가 더 빠른가?
// - Object.entries를 반복적으로 호출하는 부분은 큰 그래프에서 성능 저하를 유발할 수 있음
