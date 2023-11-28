// 보석 도둑
let jewelrys = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

// 우선순위 큐 구현
const ROOT = 1;

class Heap {
  constructor() {
    this.arr = [null];
    this.size = 0;
  }

  push = (number) => {
    this.arr.push(number);
    this.size++;
    // 1이 될때까지
    let currIndex = this.size;
    while (currIndex !== 1) {
      let tmp;
      const parentIndex = Math.floor(currIndex / 2);
      // max heap
      if (this.arr[parentIndex] < this.arr[currIndex]) {
        tmp = this.arr[parentIndex];
        this.arr[parentIndex] = this.arr[currIndex];
        this.arr[currIndex] = tmp;
      }
      currIndex = parentIndex;
    }
  };

  pop = () => {
    if (!this.size) return null;
    let ret = this.arr[1];
    this.arr[1] = this.arr[this.size];
    this.arr.pop();
    this.size--;
    let tmp;
    let currIndex = 1;
    let leftChildIndex = currIndex * 2;
    let rightChildIndex = leftChildIndex + 1;
    // rebalance
    while (true) {
      // 1. 반드시 leaf 노드까지 탐색 및 교환을 수행해야 함 => break 삭제
      // 2. 값이 0일수도 있으므로, undefined가 아닌 경우로 특정해야 함 => !== undefined
      // 3. 왼쪽 자식 노드 없이, 오른쪽 자식 노드가 있는 것이 불가능하기 때문에 조건이 간단해짐
      if (
        this.arr[leftChildIndex] !== undefined &&
        this.arr[rightChildIndex] !== undefined
      ) {
        const isLeftBig = this.arr[leftChildIndex] > this.arr[rightChildIndex];
        if (
          this.arr[currIndex] <
          this.arr[isLeftBig ? leftChildIndex : rightChildIndex]
        ) {
          if (isLeftBig) {
            tmp = this.arr[leftChildIndex];
            this.arr[leftChildIndex] = this.arr[currIndex];
            this.arr[currIndex] = tmp;
          } else {
            tmp = this.arr[rightChildIndex];
            this.arr[rightChildIndex] = this.arr[currIndex];
            this.arr[currIndex] = tmp;
          }
        }
        currIndex = isLeftBig ? leftChildIndex : rightChildIndex;
        leftChildIndex = currIndex * 2;
        rightChildIndex = leftChildIndex + 1;
      } else if (
        this.arr[leftChildIndex] !== undefined ||
        this.arr[rightChildIndex] !== undefined
      ) {
        if (this.arr[leftChildIndex] !== undefined) {
          if (this.arr[leftChildIndex] > this.arr[currIndex]) {
            tmp = this.arr[leftChildIndex];
            this.arr[leftChildIndex] = this.arr[currIndex];
            this.arr[currIndex] = tmp;
          }
          currIndex = leftChildIndex;
          leftChildIndex = currIndex * 2;
          rightChildIndex = leftChildIndex + 1;
        } else {
          if (this.arr[rightChildIndex] > this.arr[currIndex]) {
            tmp = this.arr[rightChildIndex];
            this.arr[rightChildIndex] = this.arr[currIndex];
            this.arr[currIndex] = tmp;
          }
          currIndex = rightChildIndex;
          leftChildIndex = currIndex * 2;
          rightChildIndex = leftChildIndex + 1;
        }
      } else {
        break;
      }
    }
    return ret;
  };

  // 여기가 문제였음
  // this.arr[1] 을 리턴해서 문제 발생
  top = () => this.arr[this.size === 0 ? 0 : 1];

  print = () => {
    console.log(this.arr);
  };
}

const cache = {};
const [n, k] = jewelrys.shift();
let bags = [];
let i = 0;
let answer = 0;
const heap = new Heap();
for (let i = 0; i < k; i++) {
  bags.push(jewelrys.pop()[0]);
}
jewelrys = jewelrys.sort((a, b) => a[0] - b[0]);
// multimap : 중복을 고려해야 함
jewelrys.forEach((v) => {
  if (!cache[v[0]]) cache[v[0]] = [v[1]];
  else cache[v[0]].push(v[1]);
});
// 가방 무게가 작은 순서대로 정렬하고 => 그리디(경험적)
bags = bags.sort((a, b) => a - b);
for (let value of bags) {
  // 가방 무게까지 heap에 push
  while (i <= value) {
    if (cache[i]) {
      for (let j = 0; j < cache[i].length; j++) heap.push(cache[i][j]);
    }
    i++;
  }
  // 그 중에서 최대값을 pop
  answer += heap.pop();
}

console.log(answer);
