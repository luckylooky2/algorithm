// 숨바꼭질 3 : 그래프, 너비 우선 탐색, 다익스트라, 큐
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => Number(v));
const [n, k] = input;
const map = new Array(200001).fill(0);
let count = 1;
let dir = [1, -1];

class Node {
  constructor(v = 0) {
    this.value = v;
    this.prev = null;
    this.next = null;
  }
}

class Queue {
  constructor(n) {
    let prevNode = null;

    this.head = null;
    this.tail = null;
    this.size = 0;

    for (let i = 0; i < n; i++) {
      const newNode = new Node(i + 1);
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        prevNode.next = newNode;
        newNode.prev = prevNode;
        this.tail = newNode;
      }
      prevNode = newNode;
      this.size++;
    }
  }

  pop = () => {
    const nextNode = this.head.next;

    if (nextNode !== null) nextNode.prev = null;
    else this.tail = null;
    this.head = nextNode;
    this.size--;
  };

  push = (value) => {
    const newNode = new Node(value);
    const lastNode = this.tail;

    if (this.tail !== null) lastNode.next = newNode;
    else this.head = newNode;
    newNode.prev = lastNode;
    this.tail = newNode;
    this.size++;
  };

  front = () => this.head.value;
}

let q = new Queue();

if (n <= k) {
  q.push([k, count]);
  map[k] = count;
}

while (q.size !== 0) {
  const [prev, count] = q.front();
  q.pop();

  if (prev === n) {
    console.log(count - 1);
    break;
  }
  const mod = prev % 2;
  if (mod === 0) {
    const quotinent = prev / 2;
    map[quotinent] = count;
    q.push([quotinent, count]);
  }
  for (let i = 0; i < dir.length; i++) {
    const next = prev + dir[i];
    if (next < 0 || next > 200000 || map[next] > 0) continue;
    if (mod === 0 && n * 2 < next) continue;
    map[next] = count + 1;
    q.push([next, count + 1]);
  }
}

if (n > k) {
  console.log(n - k);
}

// 1. BFS로 거꾸로 접근
// 2. n > k 일 경우 생각
// 3. 경우의 수 최적화
// - 30000 100000 : 30000 * 2 < 100000 이므로, 100000의 move(1씩 이동)은 고려할 필요가 없음
// - 30000 99999 : jump(2로 나눔)는 불가능하므로 move는 반드시 가능해야 함
