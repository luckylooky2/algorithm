// 인구 이동 : 시뮬레이션, 그래프, 너비 우선 탐색, 구현
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n, least, most] = input.shift();
const n2 = n * n;
const map = input;
let answer = 0;
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function bfs(i, j, map, team, number) {
  const q = [[i, j]];
  team[i][j] = number;
  let idx = 0;
  let sum = 0;
  const teams = [];

  while (idx < q.length) {
    const [x, y] = q[idx++];
    sum += map[x][y];
    teams.push([x, y]);
    for (const [dx, dy] of dir) {
      const [nx, ny] = [x + dx, y + dy];
      if (nx < 0 || nx >= n || ny < 0 || ny >= n || team[nx][ny] !== 0) {
        continue;
      }
      const diff = Math.abs(map[x][y] - map[nx][ny]);
      if (least <= diff && diff <= most) {
        team[nx][ny] = number;
        q.push([nx, ny]);
      }
    }
  }
  return [teams, sum];
}

while (true) {
  let teamCnt = 1;
  const team = map.map((v) => v.slice().fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (team[i][j] === 0) {
        const [teams, sum] = bfs(i, j, map, team, teamCnt);
        const divide = Math.floor(sum / teams.length);
        for (const [x, y] of teams) {
          map[x][y] = divide;
        }
        teamCnt++;
      }
    }
  }

  if (teamCnt !== n2 + 1) {
    answer++;
  }
  if (teamCnt === n2 + 1 || teamCnt === 2) {
    break;
  }
}

console.log(answer);

// 이미 한 값으로 같아진 곳들은 다시 계산하지 않아도 될 듯?
