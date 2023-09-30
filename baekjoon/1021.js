// 회전하는 큐 : 덱, 큐
const Deque = require("./deque");
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
let answer = 0;
const [n, m] = input.shift();
const arr = input.shift();
const deque = new Deque();
for (let i = 0; i < n; i++) deque.push_back(i + 1);

arr.map((v) => {
  let curr = deque.head;
  let cnt = 0;
  while (cnt <= Math.floor(deque.size / 2)) {
    if (curr.value === v) {
      for (let i = 0; i < cnt; i++) deque.push_back(deque.pop_front());
      break;
    }
    curr = curr.next;
    cnt++;
  }
  if (cnt - 1 === Math.floor(deque.size / 2)) {
    cnt = 0;
    while (deque.head.value !== v) {
      deque.push_front(deque.pop_back());
      cnt++;
    }
  }
  answer += cnt;
  deque.pop_front();
});

console.log(answer);
