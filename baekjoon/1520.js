// 내리막 길 : 동적 계획법, 깊이 우선 탐색
const map = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [m, n] = map.shift();
const offset = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
// 밑에서 지나온 길은 0으로 최신화되기 때문에
// 처음에 0으로 초기화를 할 경우, 지나온 길과 갈 수 없는 길을 구분하지 못하게 됨
// 단지 수 세기 문제처럼 -1로 초기화하여 해결
// 0 : 충분히 지나갈 수 있는데, 도착 지점에 도달하지 못한 경우
// -1 : 주변보다 값이 커서 절대로 지나갈 수 없는 경우
const dp = new Array(m).fill(null).map(() => new Array(n).fill(-1));
dp[m - 1][n - 1] = 1;

function dfs(x, y) {
  // 도착 지점을 1로 미리 지정해놓았기 때문에, 도착 지점에 도착할 수 있는 경우 1이 계속 전파될 수 있음
  if (dp[x][y] !== -1) {
    return dp[x][y];
  }
  let count = 0;

  for (let i = 0; i < 4; i++) {
    const nx = x + offset[i][0];
    const ny = y + offset[i][1];
    if (nx >= 0 && nx < m && ny >= 0 && ny < n && map[x][y] > map[nx][ny]) {
      count += dfs(nx, ny);
      // console.log(dp); // dp 테이블의 변화
    }
  }
  // 마지막에 도착하여 1을 반환했을 때, dp 테이블에 저장하는 코드가 여기 있어야 네 군데를 다 돌아보고 결과 값을 저장할 수 있음
  dp[x][y] = count;
  return count;
}

console.log(dfs(0, 0));
