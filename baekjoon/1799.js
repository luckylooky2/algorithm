// 비숍 : 백트래킹
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const map = input;
let res = 0;
let answer = 0;
let visited;
const dir = [
  [-1, -1],
  [-1, 1],
  [1, 1],
  [1, -1],
];
const isImpossible = (pos) => {
  const row = Math.floor(pos / n);
  const col = pos % n;
  return map[row][col] === 0;
};
const isUnavailable = (pos) => {
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

const backtrack = function (min, prev, depth, flag) {
  // check
  if (depth > 0 && (isImpossible(prev) || isUnavailable(prev))) {
    return;
  }

  // 비숍 개수 최신화
  res = Math.max(res, depth);

  // n이 짝수인지 홀수인지, 시작이 흑인지 백인지에 따라 확인해야 할 좌표가 달라짐
  for (let i = min; i < n * n; i += 2) {
    let adjust = 0;
    if (n % 2 === 0 && i >= n) {
      const row = Math.floor(i / n);
      if (row % 2) {
        adjust = flag === 0 ? 1 : -1;
      }
    }
    visited[i + adjust] = true;
    // 조정된 i를 넘기는 것이 아니라, 넘겨서 i를 조정
    // 단, prev는 이전 값을 넘겨야 하기 때문에 조정된 i로 넘김
    backtrack(i + 2, i + adjust, depth + 1, flag);
    visited[i + adjust] = false;
  }
};

for (let i = 0; i < 2; i++) {
  visited = new Array(n * n).fill(false);
  backtrack(i, 0, 0, i);
  answer += res;
  res = 0;
}

console.log(answer);

// 1. 먼저 자리 잡은 후 검사하는 방법
// cpp도 시간 초과

// 2. visited에 true로 표시(제거)할 때, 맵을 업데이트(복원)하는 방법
// 결과적으로 큰 차이 없음

// 3. 체스판의 흑/백을 각각 나눠서 생각
// 0 2 5 7 8 10
// 1 3 4 6 9 11
// 2^100 -> 2 * 2^50 시간 복잡도로 줄일 수 있음
// 두 경우는 상호배타적이기 때문에, 나누어 결과 값을 더하면 됨
