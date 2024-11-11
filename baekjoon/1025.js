// 제곱수 찾기 : 브루트 포스, 백트래킹
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const [n, m] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const map = input.map((v) => v.split("").map((v) => +v));
const flatted = map.flat();
let answer = -1;

function check(visit) {
  if (visit.length === 0) {
    return -1;
  }

  if (visit.length === 1) {
    return `${visit[0][2]}`;
  }

  let result = `${visit[0][2]}${visit[1][2]}`;
  const diffX = visit[1][0] - visit[0][0];
  const diffY = visit[1][1] - visit[0][1];
  for (let i = 1; i < visit.length - 1; i++) {
    const diffX2 = visit[i + 1][0] - visit[i][0];
    const diffY2 = visit[i + 1][1] - visit[i][1];
    if (diffX !== diffX2 || diffY !== diffY2) {
      return null;
    } else {
      result += visit[i + 1][2];
    }
  }
  return result;
}

function dfs(map, prev = 0, visit = [], visit2 = []) {
  count++;
  const result = check(visit);
  // 등차 수열 조건
  if (result === null) {
    return;
  }

  // 완전제곱수라면 정답
  if (Math.sqrt(+result) % 1 === 0) {
    answer = Math.max(answer, +result);
  }

  if (visit.length === Math.max(m, n)) {
    return;
  }

  for (let i = 0; i < map.length; i++) {
    if (visit2.includes(i)) {
      continue;
    }
    const row = Math.floor(i / m);
    const col = i % m;
    visit2.push(i);
    visit.push([row, col, map[i]]);
    dfs(map, i, visit, visit2);
    visit.pop();
    visit2.pop();
  }
}

dfs(flatted);

console.log(answer);
