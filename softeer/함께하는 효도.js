// 함께하는 효도 : 깊이 우선 탐색, 그래프, 브루트 포스
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n, m] = input.shift();
const friends = [];
const map = input;
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let count = 0;
const visit = map.map((v) => v.slice().fill(false));
let answer = 0;

for (let i = 0; i < m; i++) {
  friends.push(input.pop().map((v) => v - 1));
}

function dfs(pos, sum, index = 0, depth = 0) {
  count++;
  if (depth === 3) {
    const next = index + 1;
    if (next < friends.length) {
      const [fx, fy] = friends[next];
      visit[fx][fy] = true;
      dfs(friends[next], sum + map[fx][fy], next, 0);
      visit[fx][fy] = false;
    } else {
      answer = Math.max(answer, sum);
    }
    return;
  }
  const [cx, cy] = pos;
  for (const [dx, dy] of dir) {
    const [nx, ny] = [cx + dx, cy + dy];
    if (nx < 0 || nx >= n || ny < 0 || ny >= n || visit[nx][ny]) {
      continue;
    }
    visit[nx][ny] = true;
    dfs([nx, ny], sum + map[nx][ny], index, depth + 1);
    visit[nx][ny] = false;
  }
}

const [sx, sy] = friends[0];
visit[sx][sy] = true;
dfs(friends[0], map[sx][sy]);

console.log(answer);
