// 에디터 : 연결 리스트, 스택, 덱
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const answer = [];

// deque ver.
// class Node {
//   constructor(v) {
//     this.value = v;
//     this.prev = null;
//     this.next = null;
//   }
// }

// class Deque {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//     this.size = 0;
//   }

//   push_back = (v) => {
//     const newNode = new Node(v);
//     if (!this.size) {
//       this.head = newNode;
//       this.tail = newNode;
//     } else {
//       this.tail.next = newNode;
//       newNode.prev = this.tail;
//       this.tail = newNode;
//     }
//     this.size++;
//   };

//   push_front = (v) => {
//     const newNode = new Node(v);
//     if (!this.size) {
//       this.head = newNode;
//       this.tail = newNode;
//     } else {
//       this.head.prev = newNode;
//       newNode.next = this.head;
//       this.head = newNode;
//     }
//     this.size++;
//   };

//   pop_front = () => {
//     let ret;
//     if (!this.size) return null;
//     else if (this.size === 1) {
//       ret = this.head;
//       this.head = null;
//       this.tail = null;
//     } else {
//       let next = this.head.next;
//       ret = this.head;
//       ret.next = null;
//       next.prev = null;
//       this.head = next;
//     }
//     this.size--;
//     return ret.value;
//   };

//   pop_back = () => {
//     let ret;
//     if (!this.size) return null;
//     else if (this.size === 1) {
//       ret = this.head;
//       this.head = null;
//       this.tail = null;
//     } else {
//       let prev = this.tail.prev;
//       ret = this.tail;
//       ret.prev = null;
//       prev.next = null;
//       this.tail = prev;
//     }
//     this.size--;
//     return ret.value;
//   };

//   print = () => {
//     let curr = this.head;
//     for (let i = 0; i < this.size; i++) {
//       //   console.log(curr.value);
//       answer.push(curr.value);
//       curr = curr.next;
//     }
//   };
// }

// const prevQ = new Deque();
// const nextQ = new Deque();
// input[0].split("").map((v) => prevQ.push_back(v));
// const n = parseInt(input[1], 10);

// for (let i = 0; i < n; i++) {
//   const command = input[i + 2].split(" ");
//   if (command[0] === "L") {
//     const popped = prevQ.pop_back();
//     if (popped !== null) nextQ.push_front(popped);
//   } else if (command[0] === "D") {
//     const popped = nextQ.pop_front();
//     if (popped !== null) prevQ.push_back(popped);
//   } else if (command[0] === "B") prevQ.pop_back();
//   else if (command[0] === "P") prevQ.push_back(command[1]);
// }

// prevQ.print();
// nextQ.print();
// console.log(answer.join(""));

// stack ver.
const prevStack = [];
const nextStack = [];
input[0].split("").map((v) => prevStack.push(v));
const n = parseInt(input[1], 10);

for (let i = 0; i < n; i++) {
  const command = input[i + 2].split(" ");
  if (command[0] === "L") {
    const popped = prevStack.pop();
    if (popped !== undefined) nextStack.push(popped);
  } else if (command[0] === "D") {
    const popped = nextStack.pop();
    if (popped !== undefined) prevStack.push(popped);
  } else if (command[0] === "B") prevStack.pop();
  else if (command[0] === "P") prevStack.push(command[1]);
}

for (let i = 0; i < prevStack.length; i++) answer.push(prevStack[i]);
for (let i = 0; i < nextStack.length; i++)
  answer.push(nextStack[nextStack.length - 1 - i]);
console.log(answer.join(""));
