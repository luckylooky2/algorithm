// 도로의 개수 : 동적 계획법
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n, m] = input.shift();
const [k] = input.shift();
const roadWorks = input;
const [X, Y] = [0, 1];
const dp = new Array(n + 1).fill(null).map(() => new Array(m + 1).fill(BigInt(1)));
const map = new Array(n + 1).fill(null).map(() => new Array(m + 1).fill(null).map(() => new Set()));

for (const work of roadWorks) {
  let start, end, dir;
  // 시작 지점 정렬
  if (work[0] + work[1] > work[2] + work[3]) {
    start = work.slice(2);
    end = work.slice(0, 2);
  } else {
    start = work.slice(0, 2);
    end = work.slice(2);
  }

  // 공사 방향 설정
  if (start[0] === end[0]) {
    dir = Y; // y축 증가
  } else {
    dir = X; // x축 증가
  }

  // 가장 첫 줄일 경우, 이후에 모든 칸에는 접근할 수 없으므로 0으로 설정
  if (start[0] === 0 && end[0] === 0) {
    // n, m에 주의 => TypeError
    for (let i = end[1]; i <= m; i++) {
      dp[0][i] = 0n;
    }
  }

  if (start[1] === 0 && end[1] === 0) {
    for (let i = end[0]; i <= n; i++) {
      dp[i][0] = 0n;
    }
  }

  // 시작한 곳과 방향을 저장
  map[start[0]][start[1]].add(dir);
}

// 한 줄일 경우, 위와 옆으로 이동할 수 없으므로 0으로 수정
if (n === 1) {
  dp[1][0] = 0n;
}

if (m === 1) {
  dp[0][1] = 0n;
}

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    let [left, up] = [dp[i][j - 1], dp[i - 1][j]];

    // 현재를 만들 수 있는 경우의 수는 왼쪽(X)과 위쪽(Y)인데
    if (map[i][j - 1].size) {
      // Y축으로 공사중이라면
      if (map[i][j - 1].has(Y)) {
        left = 0n;
      }
    }

    if (map[i - 1][j].size) {
      // X축으로 공사중이라면
      if (map[i - 1][j].has(X)) {
        up = 0n;
      }
    }

    dp[i][j] = left + up;
  }
}

console.log(n === 1 && m === 1 ? 2 : String(dp[n][m]));
