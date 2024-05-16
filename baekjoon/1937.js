// 욕심쟁이 판다 : 동적 계획법, 깊이 우선 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const map = input;
const dp = map.map((v) => v.slice().fill(0));
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let count = 0;
const dfs = function (curr, map, start) {
  const [x, y] = curr;
  let max = 0;

  for (const [dx, dy] of dir) {
    const [nextX, nextY] = [x + dx, y + dy];
    if (
      nextX < 0 ||
      nextX >= n ||
      nextY < 0 ||
      nextY >= n ||
      map[x][y] >= map[nextX][nextY]
    ) {
      continue;
    }
    if (dp[nextX][nextY]) {
      max = Math.max(max, count + dp[nextX][nextY]);
    } else {
      const res = dfs([nextX, nextY], map, start);
      max = Math.max(max, count + res);
    }
  }

  // pass compression : 경로 압축
  // 방문했던 경로에 값을 저장하면서 반환
  return (dp[x][y] = Math.max(dp[start[0]][start[1]], max + 1));
};

// 시작 지점과 끝 지점이 어느 곳이 되어도 상관 없음
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    count = 0;
    dfs([i, j], map, [i, j]);
  }
}

let max = 0;
for (const elem of dp) {
  max = Math.max(max, ...elem);
}
console.log(max);

// visited 뺐다고 실행 시간이 크게 차이가 나나?
// - 포함시킨 코드는 시간 초과 발생
// - 아무것도 안하고 인자만 넘겨주었을 뿐인데?

// Try 1
// - dp + dfs : dfs로 탐색하되, 한 번 탐색한 곳은 다음에 방문시 캐시 값을 사용
// - map에 중복 값이 없다고 생각하고 dp 테이블을 구성
// - 하지만 서로 다른 출발점에서 같은 dp 테이블을 참조할 수 없기 때문에 실패

// Try 2
// - dp 배열을 visited 배열과 겸해서 사용
// - 로직
// - 1. 가장 큰 값이 나올 때까지 dfs
// - 2. 해당 칸을 나올 때, 이동할 수 있는 경우의 수에서 가장 큰 값(max) + 1을 저장하고 나온다.
// - 3. 이동할 수 있는 경우의 수에서 dp 테이블에 값이 있으면 값을 바로 더하고, 없다면 dfs를 호출한다.
