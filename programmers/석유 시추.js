// 석유 시추 : dfs, 브루트 포스
function solution(land) {
  const petrol = [];
  // n : 세로, m : 가로
  const [n, m] = [land.length, land[0].length];
  const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const visited = new Array(n).fill(null).map(() => new Array(m).fill(false));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (visited[i][j] || land[i][j] === 0) {
        continue;
      }
      const q = [[i, j]]; // [y, x]
      let [minX, maxX] = [j, j];
      let idx = 0;
      while (idx !== q.length) {
        const [currY, currX] = q[idx++];
        for (const [dy, dx] of dir) {
          const [nextY, nextX] = [currY + dy, currX + dx];
          if (
            nextY < 0 ||
            nextY >= n ||
            nextX < 0 ||
            nextX >= m ||
            visited[nextY][nextX] ||
            land[nextY][nextX] === 0
          ) {
            continue;
          }
          q.push([nextY, nextX]);
          visited[nextY][nextX] = true;
          minX = Math.min(minX, nextX);
          maxX = Math.max(maxX, nextX);
        }
      }
      petrol.push([minX, maxX, q.length === 1 ? 1 : q.length - 1]);
    }
  }
  const answer = new Array(m).fill(0);
  console.log(petrol);
  for (const [minX, maxX, value] of petrol) {
    for (let i = minX; i <= maxX; i++) {
      answer[i] += value;
    }
  }
  let max = answer[0];
  for (let i = 0; i < answer.length; i++) {
    if (max < answer[i]) {
      max = answer[i];
    }
  }
  return max;
}
