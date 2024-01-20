// 숨바꼭질 3 : 그래프, 너비 우선 탐색, 다익스트라, 큐, 우선순위 큐
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

let q = [];

if (n <= k) {
  q.push([k, count]);
  map[k] = count;
}

while (q.length !== 0) {
  const [prev, count] = q.shift();

  if (prev === n) {
    console.log(count - 1);
    break;
  }

  const mod = prev % 2;
  if (mod === 0 && prev > n) {
    const quotinent = prev / 2;
    map[quotinent] = count;
    q.push([quotinent, count]);
  }
  for (let i = 0; i < dir.length; i++) {
    const next = prev + dir[i];
    if (next < 0 || next > 100000 || map[next] > 0) continue;
    // k보다 크면 왜 안 되는가?
    // if (next > k) continue;
    // 없어도 시간 초과없이 통과
    // if (mod === 0 && n * 2 < next) continue;
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

// 사실 이 문제는 운으로 맞혔다
// 반례) 1002 1337
// 이 문제는 이미 방문한 자리(335)보다 작은 숫자(334)로 업데이트를 하는 로직을 추가하면 시간 초과가 발생한다 => 정확한 시간 복잡도는?
// 그래서 시간 복잡도를 위해 다시 방문하지 않기 위해서, 첫 번째 방문했을 때 최적화된 숫자를 넣어야 한다
// 최적화된 숫자(더 작은 숫자)는 우선순위 큐를 통해 구할 수 있다 => 어떻게?
// 그렇지 않고 일반 큐를 사용하는 방법으로는 카운트를 저장한 맵에 접근하는 순서에 따라 답이 달라진다
// n -> k 방향(커지는 방향)으로 탐색하는 경우애는 [-1, 1] 순서로 탐색해야 최적화가 된다
// 반대로 k -> n(작아지는 방향)으로 탐색하는 경우에는 [1, -1] 순서로 탐색해야 한다
// 이유는? 어떤 방향으로 먼저 처리할 것인가가 중요하기 때문인 것 같다(양쪽에서 하나가 남은 상황에서 어떤 방향이 먼저 처리될 것인가?)
// [-1, 1] 경우 : (1) 상황에서 334보다 335가 먼저 불리기 때문에 336이 됨
// [1, -1] 경우 : (2) 상황에서 335보다 334가 먼저 불리기 때문에 334가 됨
// 거꾸로 올라오는 경우에는 방향이 반대 : 같은 상황에서 - 방향이 먼저 불림
// (1) k -> n / [-1, 1] : 325 326 327 328 329 330 331 332 333 334 "336" 335 334 333 332 331 330
// (2) k -> n / [1, -1] : 325 326 327 328 329 330 331 332 333 334 "335" 335 334 333 332 331 330
// (3) n -> k / [-1, 1] : 325 326 327 328 329 330 331 332 333 334 "335" 335 334 333 332 331 330
// priority queue : 올라가는 방향이면 작은 인덱스(-1)를 먼저 처리하고, 내려가는 방향이면 큰 인덱스(+1)를 먼저 처리한다
// deque : 2를 곱해주는 것은 push_front, -+1은 push_back으로 처리한다(어떤 인덱스를 먼저 처리해도 상관없음)

// 2의 배수를 먼저 고려하는 방법

// const input = require("fs")
//   .readFileSync("/dev/stdin")
//   .toString()
//   .trim()
//   .split(" ")
//   .map((v) => Number(v));
// const [n, k] = input;
// const map = new Array(200001).fill(0);
// let dir = [-1, 1];

// class Node {
//   constructor(v = 0) {
//     this.value = v;
//     this.prev = null;
//     this.next = null;
//   }
// }

// class Queue {
//   constructor(n) {
//     let prevNode = null;

//     this.head = null;
//     this.tail = null;
//     this.size = 0;

//     for (let i = 0; i < n; i++) {
//       const newNode = new Node(i + 1);
//       if (this.head === null) {
//         this.head = newNode;
//         this.tail = newNode;
//       } else {
//         prevNode.next = newNode;
//         newNode.prev = prevNode;
//         this.tail = newNode;
//       }
//       prevNode = newNode;
//       this.size++;
//     }
//   }

//   pop = () => {
//     const nextNode = this.head.next;

//     if (nextNode !== null) nextNode.prev = null;
//     else this.tail = null;
//     this.head = nextNode;
//     this.size--;
//   };

//   push = (value) => {
//     const newNode = new Node(value);
//     const lastNode = this.tail;

//     if (this.tail !== null) lastNode.next = newNode;
//     else this.head = newNode;
//     newNode.prev = lastNode;
//     this.tail = newNode;
//     this.size++;
//   };

//   front = () => this.head.value;
// }

// let q = new Queue();
// q.push(n);
// map[n] = 1;

// while (q.size !== 0) {
//   const prev = q.front();
//   q.pop();
//   if (prev === k) {
//     console.log(map[prev] - 1);
//     break;
//   }
//   // 2배 거리
//   let next = prev * 2;
//   while (next <= 100000 && map[next] === 0) {
//     map[next] = map[prev];
//     q.push(next);
//     next *= 2;
//   }
//   // 앞 뒤
//   for (let i = 0; i < dir.length; i++) {
//     next = prev + dir[i];
//     if (next < 0 || next > 100000 || map[next] !== 0) continue;
//     map[next] = map[prev] + 1;
//     q.push(next);
//   }
// }
