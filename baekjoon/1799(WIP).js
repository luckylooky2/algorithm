// 비숍
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const map = input;
const visited = new Array(n * n).fill(false);
let answer = 0;
const dir = [
  [-1, -1],
  [-1, 1],
  [1, 1],
  [1, -1],
];
const isImpossible = (pos) => {
  pos--;
  const row = Math.floor(pos / n);
  const col = pos % n;
  return map[row][col] === 0;
};
const isUnavailable = (pos) => {
  pos--;
  const row = Math.floor(pos / n);
  const col = pos % n;
  let flag = false;
  for (let [dR, dC] of dir) {
    let nextRow = row + dR;
    let nextCol = col + dC;

    while (nextCol >= 0 && nextCol < n && nextRow >= 0 && nextRow < n) {
      const target = nextRow * n + nextCol;
      if (visited[target]) {
        flag = true;
        break;
      }
      nextRow += dR;
      nextCol += dC;
    }
    if (flag) {
      return true;
    }
  }
  return false;
};

(function backtrack(min, depth) {
  // check
  if (depth > 0 && (isImpossible(min) || isUnavailable(min))) {
    return;
  }

  // 비숍 개수 최신화
  answer = Math.max(answer, depth);

  if (depth > 2 * (n - 1)) {
    console.log(123);
    return;
  }

  for (let i = min; i < n * n; i++) {
    visited[i] = true;
    backtrack(i + 1, depth + 1);
    visited[i] = false;
  }
})(0, 0);

console.log(answer);

// 1. 먼저 자리 잡은 후 검사하는 방법
// cpp도 시간 초과

// 2. visited에 true로 표시(제거)할 때, 맵을 업데이트(복원)하는 방법
// 결과적으로 큰 차이 없음
