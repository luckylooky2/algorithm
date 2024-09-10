// 쇼핑몰 : 우선순위 큐
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n, k] = input.shift();
const members = input;
let idx = 0;
const [ID, TIME, INDEX] = [0, 1, 2];

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
      // 추가 정렬 로직: 시간이 같을 때는 인덱스 내림차순으로 정렬
      // - AND(||)로 이어짐에 주의
      // if (
      //   this.arr[curr][TIME] < this.arr[parent][TIME] ||
      //   (this.arr[curr][TIME] === this.arr[parent][TIME] &&
      //     this.arr[curr][INDEX] < this.arr[parent][INDEX])
      // )
      if (this.arr[curr][TIME] < this.arr[parent][TIME]) {
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
        if (this.arr[curr][TIME] > this.arr[left][TIME]) {
          [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
        }
        curr = left;
        left = curr * 2;
        right = left + 1;
      } else {
        // left, right와 비교
        const isLeftSmall = this.arr[right][TIME] > this.arr[left][TIME];
        if (isLeftSmall) {
          if (this.arr[curr][TIME] > this.arr[left][TIME]) {
            [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
          }
        } else {
          if (this.arr[curr][TIME] > this.arr[right][TIME]) {
            [this.arr[curr], this.arr[right]] = [
              this.arr[right],
              this.arr[curr],
            ];
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

const heap = new MinHeap();
const answer = [];

for (let i = 0; i < k && i < n; i++) {
  // [id, time, index]
  heap.push([...members[i], i]);
  idx++;
}

let offset = 0;

while (true) {
  const candidates = [];
  // 전체 배열에서 최소값을 빼기(순회하지 않고 한 번에) => 배열이 아니라 다른 것을 써야 하나? => 우선순위 큐
  const top = heap.top();
  if (top === null) {
    break;
  }
  heap.pop();
  candidates.push(top);

  while (heap.top() && top[TIME] === heap.top()[TIME]) {
    const sameTime = heap.top();
    heap.pop();
    candidates.push(sameTime);
  }

  // 스택을 사용하는 방법이 있지만, 우선순위 큐 정렬을 1) 시간 오름차순 2) 인덱스 내림차순으로 정렬이 필요
  // 위의 우선순위 큐 코드에서 어떻게 정렬 로직을 추가하는가?
  const indexDESC = candidates.slice().sort((a, b) => b[INDEX] - a[INDEX]);
  const sortedUpIndex = candidates.map((v) => v[INDEX]).sort((a, b) => a - b);

  for (let i = 0; i < indexDESC.length; i++) {
    answer.push(indexDESC[i][ID]);
  }

  offset += top[TIME] - offset;

  for (let i = 0; i < sortedUpIndex.length; i++) {
    if (idx === n) {
      break;
    }
    heap.push([
      members[idx][ID],
      members[idx][TIME] + offset,
      sortedUpIndex[i],
    ]);
    idx++;
  }
}

console.log(
  "" + answer.reduce((acc, curr, i) => acc + BigInt(curr) * BigInt(i + 1), 0n)
);

// 4 0 0 << 123
// 4 5 0 << 21
// p = 4
// 4 5 14 << 34
// 0 1 10 >> 123 // 가장 작은 것을 기준으로 모두 차감. 1개일 경우, 정답에 뺴고 큐에서 빼서 넣음
// 1 1 10 << 56 // 5 5 14
// p = 5
// 1 0 9 >> 21 // 2개일 경우, 큐의 번호가 큰 것부터 다 빼고, 큐의 번호가 작은 것부터 큐에서 빼서 넣음
// 0 0 9 >> 56
// 7 0 9 << 45
// 7 5 9 << 723 // 12 10 14
// p = 7
// 2 0 4 >> 723
// 2 7 4 << 55
// 0 5 2 >> 45
// 5 5 2 << 13
// 2 2 0 >> 34
// 2 2 10 << 910
// 2 0 8 >> 55
// 0 0 8 >> 13
// 3 0 8 << 73
// 0 0 5 >> 73
// 0 0 0 >> 910
