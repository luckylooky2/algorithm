// 체스판 다시 칠하기 2 : 누적 합, 슬라이딩 윈도우
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const [n, m, k] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const [BLACK, WHITE] = ["B", "W"];
const map = input.map((v) => v.split("").map((v) => (v === BLACK ? 0 : 1)));
let answer = Infinity;
// 시작이 0
const blackMap = map.map((v) => v.slice().fill(0));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    blackMap[i][j] = (i + j) % 2 ? 1 : 0;
  }
}
// 시작이 1
const whiteMap = blackMap.map((v) => v.slice().map((v) => (v === 0 ? 1 : 0)));
const changedPrefixSumByColumnFromBlackMap = map.map((v) => v.slice().fill(0));
const changedPrefixSumByColumnFromWhiteMap = map.map((v) => v.slice().fill(0));

// 누적합 배열 완성
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    changedPrefixSumByColumnFromBlackMap[i][j] =
      j === 0 ? 0 : changedPrefixSumByColumnFromBlackMap[i][j - 1];
    changedPrefixSumByColumnFromWhiteMap[i][j] =
      j === 0 ? 0 : changedPrefixSumByColumnFromWhiteMap[i][j - 1];
    if (map[i][j] !== blackMap[i][j]) {
      changedPrefixSumByColumnFromBlackMap[i][j] += 1;
    }
    if (map[i][j] !== whiteMap[i][j]) {
      changedPrefixSumByColumnFromWhiteMap[i][j] += 1;
    }
  }
}

// range: (ROW) Math.max(0, i - len) ~ len, (COLUMN) Math.max(0, j - len) ~ len
function solve(sums, len) {
  // col: 끝 인덱스를 하나씩 늘려가면서 완전 탐색
  for (let i = len - 1; i <= m - 1; i++) {
    let sum = 0;
    // k개의 row만큼 col 끝(i - len) - col 시작(i) 합을 누적
    for (let k = 0; k < len; k++) {
      sum += sums[k][i] - (i - len < 0 ? 0 : sums[k][i - len]);
    }
    answer = Math.min(answer, sum);
    // row: 끝 인덱스를 하나씩 늘려가면서 완전 탐색(슬라이딩 윈도우)
    for (let j = len; j <= n - 1; j++) {
      // 가장 앞의 row를 빼고, 다음 row를 추가
      sum -= sums[j - len][i] - (i - len < 0 ? 0 : sums[j - len][i - len]);
      sum += sums[j][i] - (i - len < 0 ? 0 : sums[j][i - len]);
      answer = Math.min(answer, sum);
    }
  }
}

solve(changedPrefixSumByColumnFromBlackMap, k);
solve(changedPrefixSumByColumnFromWhiteMap, k);

console.log(answer);

// 4 4 1 => 4 * 4
// 4 4 2 => 3 * 3 * 2 * 2
// 연산 횟수: (m - (k - 1)) * (n - (k - 1)) * k * k => k^4
