// 내진 설계 : 그래프, 구현, 시뮬레이션
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const [n, m] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const map = input.map((v) => v.split(""));
const [ORIGIN, ROAD, NOT_PROOF, PROOF, WALL] = ["@", ".", "*", "#", "|"];
const [NOT_COLLAPSED, COLLAPSED] = [0, 1];
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let startPos = null;
let answer = [0, 0];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === NOT_PROOF || map[i][j] === PROOF) {
      answer[NOT_COLLAPSED]++;
      map[i][j] = map[i][j] === NOT_PROOF ? 1 : 2;
    } else if (map[i][j] === ORIGIN) {
      startPos = [i, j];
    } else if (map[i][j] === ROAD) {
      map[i][j] = 0;
    } else if (map[i][j] === WALL) {
      map[i][j] = -1;
    }
  }
}

const q = [startPos];
let idx = 0;

while (idx < q.length) {
  const [cX, cY] = q[idx++];

  for (const [dx, dy] of dir) {
    const [nX, nY] = [cX + dx, cY + dy];
    if (nX < 0 || nX >= n || nY < 0 || nY >= m || map[nX][nY] === -1) {
      continue;
    }

    if (map[nX][nY] > 0) {
      map[nX][nY]--;
      if (!map[nX][nY]) {
        answer[NOT_COLLAPSED]--;
        answer[COLLAPSED]++;
        q.push([nX, nY]);
      }
    }
  }

  if (idx === 1) {
    for (const [dx, dy] of dir) {
      const [nX, nY] = [cX + dx, cY + dy];
      const [nnX, nnY] = [cX + 2 * dx, cY + 2 * dy];
      if (
        nnX < 0 ||
        nnX >= n ||
        nnY < 0 ||
        nnY >= m ||
        map[nX][nY] === -1 ||
        map[nnX][nnY] === -1
      ) {
        continue;
      }

      if (map[nnX][nnY] > 0) {
        map[nnX][nnY]--;
        if (!map[nnX][nnY]) {
          answer[NOT_COLLAPSED]--;
          answer[COLLAPSED]++;
          q.push([nnX, nnY]);
        }
      }
    }
  }
}

console.log(answer.reverse().join(" "));

// 시뮬레이션: 단계가 명확하게 구분이 되어있는 경우?
