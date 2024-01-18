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
    // 없어도 통과하긴 함
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
