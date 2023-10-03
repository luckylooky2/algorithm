// 뱀 : 덱, 큐, 시뮬레이션
const Deque = require("./deque");
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = parseInt(input[0], 10);
const map = new Array(n).fill(null).map(() => new Array(n).fill(0));
const numApples = parseInt(input[1], 10);
const numCommands = parseInt(input[1 + numApples + 1], 10);
const commands = [];
const snake = new Deque();
const APPLE = 2;
const RIGHT = 0,
  DOWN = 1,
  LEFT = 2,
  UP = 3;
const DIR = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
let currDir = RIGHT;
let second = 0;
let commandIndex = 0;
let flag = false;

snake.push_back([0, 0]);
for (let i = 0; i < numApples; i++) {
  const [x, y] = input[2 + i].split(" ").map((v) => parseInt(v, 10));
  map[x - 1][y - 1] = APPLE;
}
for (let i = 0; i < numCommands; i++)
  commands.push(
    input[2 + numApples + 1 + i]
      .split(" ")
      .map((v, i) => (i === 0 ? parseInt(v, 10) : v))
  );

while (true) {
  // 방향 전환
  if (commands[commandIndex] && commands[commandIndex][0] === second) {
    if (commands[commandIndex][1] === "L") {
      if (currDir === RIGHT) currDir = UP;
      else currDir--;
    } else {
      if (currDir === UP) currDir = RIGHT;
      else currDir++;
    }
    commandIndex++;
  }
  second++;
  // 다음 칸 추가 => 끝난 뒤에
  const next = [
    snake.head.value[0] + DIR[currDir][0],
    snake.head.value[1] + DIR[currDir][1],
  ];
  snake.push_front(next);
  // 화면을 나가면 끝
  if (!(next[0] >= 0 && next[0] < n && next[1] >= 0 && next[1] < n)) break;
  // 자신의 몸에 부딪히면 끝
  let curr = snake.head.next;
  for (let i = 0; i < snake.size - 1; i++) {
    if (next[0] === curr.value[0] && next[1] === curr.value[1]) {
      flag = true;
      break;
    }
    curr = curr.next;
  }
  if (flag) break;
  // 사과가 있으면 pop_back하지 않음
  if (map[next[0]][next[1]] !== 2) snake.pop_back();
  else map[next[0]][next[1]] = 0;
}

console.log(second);
