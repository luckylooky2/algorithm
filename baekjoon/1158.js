// 요세푸스 문제 : 큐
const [n, k] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v, 10));

const queue = Array.from({ length: n }, (v, i) => i + 1);
const answer = [];
let head = 0;
let tail = n - 1;
let count = 1;

while (head !== tail) {
  // 제거
  if (count % k === 0) answer.push(queue[head]);
  else {
    // 추가
    tail = tail + 1 === n ? 0 : ++tail;
    queue[tail] = queue[head];
  }
  head = head + 1 === n ? 0 : ++head;
  count++;
}
answer.push(queue[head]);

console.log("<" + answer.join(", ") + ">");
