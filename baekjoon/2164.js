// 카드2 : 큐
const n = parseInt(
  require("fs").readFileSync("/dev/stdin").toString().trim(),
  10
);

// 1. 배열을 이용한 원형 큐
const queue = Array.from({ length: n }, (v, i) => i + 1);
let front = 0;
let rear = n - 1;

while (front !== rear) {
  // 1) 가장 위의 카드를 제거
  front = front + 1 === n ? 0 : ++front;
  // 2) 그 다음 카드를 맨 뒤로 넘기기 => O(n)
  rear = rear + 1 === n ? 0 : ++rear;
  queue[rear] = queue[front];
  front = front + 1 === n ? 0 : ++front;
}

console.log(queue[front]);

// 2. 연결 리스트를 이용한 큐
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

// const queue = new Queue(n);

// while (queue.size !== 1) {
//   queue.pop();
//   queue.push(queue.front());
//   queue.pop();
// }

// console.log(queue.front());

// 3. 점화식
// const answer = new Array(n + 1).fill(0);
// answer[1] = 1;

// for (let i = 2; i <= n; i++) {
//   if (Math.log2(i - 1) % 1 === 0) answer[i] = 2;
//   else answer[i] = answer[i - 1] + 2;
// }

// console.log(answer[n]);
