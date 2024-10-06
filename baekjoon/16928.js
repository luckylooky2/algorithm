// 뱀과 사다리 게임 : 그래프, 너비 우선 탐색
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
let idx = 0;
const [ladderNum, snakeNum] = input[idx++];
const [ladder, snake] = [new Map(), new Map()];
const target = 100;

for (let i = idx; i < input.length; i++) {
  const [start, end] = input[i];
  if (start < end) {
    ladder.set(start, end);
  } else {
    snake.set(start, end);
  }
}

const map = new Array(101).fill(Infinity);
map[1] = 0;
const q = [1];
let qIdx = 0;

while (qIdx < q.length) {
  const curr = q[qIdx++];
  if (ladder.get(curr)) {
    const next = ladder.get(curr);
    if (map[next] > map[curr]) {
      q.push(next);
      map[next] = map[curr];
    }
    continue;
  }
  if (snake.get(curr)) {
    const next = snake.get(curr);
    if (map[next] > map[curr]) {
      q.push(next);
      map[next] = map[curr];
    }
    continue;
  }
  for (let i = 1; i <= 6; i++) {
    const next = curr + i;
    if (map[next] <= map[curr] + 1 || next > 100) {
      continue;
    }
    map[next] = map[curr] + 1;
    q.push(next);
  }
}

console.log(map[target]);

// 처음 100에 도달한 지점이 가장 작은 수가 아닐 수 있다.
// - 대부분의 경우는 맞지만 어떤 경우에 그렇게 되지 않는가?
// - 논리적으로는 뱀을 타고 간 경우라면 카운트가 증가하지 않는다.
// - 그래서 언젠가 뱀을 타고 가지 않은 먼저 간 케이스가 존재할 것인데 이보다 뱀을 타고 간 경우가 더 늦게 도착할 수도 있다.
// - 그 케이스를 위해서 모든 경우를 탐색하는 편이 더 정확할 것이라고 추측한다.
// - 정확히 어떤 케이스인지는 모르겠다.
