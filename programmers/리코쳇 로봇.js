// 리코쳇 로봇 : 너비 우선 탐색
function solution(board) {
  var answer = -1;
  const q = [];
  const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  board = board.map((v) => v.split(""));
  const n = board.length;
  const m = board[0].length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === "R") q.push([[i, j], 0]);
    }
  }
  // bfs
  while (q.length !== 0) {
    const [topCoord, cnt] = q[0];
    q.shift(); // 시간 복잡도 고려
    // G라면 break;
    if (board[topCoord[0]][topCoord[1]] === "G") {
      answer = cnt;
      break;
    }
    board[topCoord[0]][topCoord[1]] = "V";
    for (let i = 0; i < dir.length; i++) {
      // R위치 최신화
      const next = [topCoord[0], topCoord[1]];
      const [dx, dy] = dir[i];
      while (
        !(
          next[0] + dx < 0 ||
          next[0] + dx >= n ||
          next[1] + dy < 0 ||
          next[1] + dy >= m ||
          board[next[0] + dx][next[1] + dy] === "D"
        )
      ) {
        next[0] = next[0] + dx;
        next[1] = next[1] + dy;
      }
      if (board[next[0]][next[1]] === "V") continue;
      q.push([next, cnt + 1]);
    }
  }
  return answer;
}
