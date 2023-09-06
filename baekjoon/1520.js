// 내리막 길
const map = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [m, n] = map.shift();
const visited = new Array(m).fill(null).map(() => new Array(n).fill(false));
let answer = 0;
let count = 0;

function dfs(x, y, visited) {
  if (x === n - 1 && y === m - 1) {
    answer++;
    return;
  }
  count++;

  if (x + 1 < n && map[y][x + 1] < map[y][x]) {
    if (visited[y][x + 1]) return;
    visited[y][x + 1] = true;
    dfs(x + 1, y, visited);
    visited[y][x + 1] = false;
  }
  if (y + 1 < m && map[y + 1][x] < map[y][x]) {
    if (visited[y + 1][x]) return;
    visited[y + 1][x] = true;
    dfs(x, y + 1, visited);
    visited[y + 1][x] = false;
  }
  if (x - 1 >= 0 && map[y][x - 1] < map[y][x]) {
    if (visited[y][x - 1]) return;
    visited[y][x - 1] = true;
    dfs(x - 1, y, visited);
    visited[y][x - 1] = false;
  }
  if (y - 1 >= 0 && map[y - 1][x] < map[y][x]) {
    if (visited[y - 1][x]) return;
    visited[y - 1][x] = true;
    dfs(x, y - 1, visited);
    visited[y - 1][x] = false;
  }
}

dfs(0, 0, visited);
console.log(answer);
console.log(count);
