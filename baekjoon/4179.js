// 불! : 그래프 탐색, 너비 우선 탐색
const Queue = require("./queue");
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v, 10));
const map = input.map((v) => v.split(""));
const fq1 = new Queue();
const fq2 = new Queue();
const pq1 = new Queue();
const pq2 = new Queue();
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let flag = false;
let fqFirst = true,
  pqFirst = true;
let pqCnt = 1;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === "F") fq1.push([i, j]);
    else if (map[i][j] === "J") pq1.push([i, j]);
  }
}

while (true) {
  // 불 위치 다음 단계 계산
  while (fqFirst ? fq1.size !== 0 : fq2.size !== 0) {
    const top = fqFirst ? fq1.head.value : fq2.head.value;
    fqFirst ? fq1.pop() : fq2.pop();
    for (let i = 0; i < dir.length; i++) {
      const next = [top[0] + dir[i][0], top[1] + dir[i][1]];
      if (
        next[0] < 0 ||
        next[0] >= n ||
        next[1] < 0 ||
        next[1] >= m ||
        map[next[0]][next[1]] === "#" ||
        map[next[0]][next[1]] === "F"
      )
        continue;
      fqFirst ? fq2.push(next) : fq1.push(next);
      map[next[0]][next[1]] = "F";
    }
  }
  fqFirst = !fqFirst;

  // 플레이어 위치 다음 단계 계산
  while (pqFirst ? pq1.size !== 0 : pq2.size !== 0) {
    const pos = pqFirst ? pq1.head.value : pq2.head.value;
    pqFirst ? pq1.pop() : pq2.pop();
    for (let i = 0; i < dir.length; i++) {
      const next = [pos[0] + dir[i][0], pos[1] + dir[i][1]];
      if (next[0] < 0 || next[0] >= n || next[1] < 0 || next[1] >= m) {
        flag = true;
        break;
      }
      const nextElem = map[next[0]][next[1]];
      if (nextElem === "#" || nextElem === "F" || nextElem === "J") continue;
      pqFirst ? pq2.push(next) : pq1.push(next);
      map[next[0]][next[1]] = "J";
    }
    if (flag) break;
  }
  // 출구로 나왔을 때
  if (flag) break;
  pqFirst = !pqFirst;
  pqCnt++;
  // 출구로 나갈 수 없을 때
  if (!fq1.size && !fq2.size && !pq1.size && !pq2.size) break;
}

console.log(flag ? pqCnt : "IMPOSSIBLE");
