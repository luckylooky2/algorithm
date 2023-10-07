// 숨바꼭질 : 그래프 탐색, 너비 우선 탐색
const Queue = require("./queue");
const [n, k] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v, 10));
const q = new Queue();
const dir = [-1, 1, 2];
const max = (n > k ? n : k + 1) + 1;
const map = new Array(max).fill(0);
let flag = false;

if (n !== k) q.push(n);
else console.log(0);

map[n] = 1;
while (q.size !== 0) {
  const front = q.head.value;
  q.pop();
  for (let i = 0; i < dir.length; i++) {
    let next;
    if (i !== 2) next = front + dir[i];
    else next = front * dir[i];
    if (next < 0 || next >= max || map[next] > 0) continue;
    q.push(next);
    map[next] = map[front] + 1;
    if (next === k) {
      flag = true;
      console.log(map[next] - 1);
      break;
    }
  }
  if (flag) break;
}
