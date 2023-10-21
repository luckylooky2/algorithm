// 리코쳇 로봇 : bfs
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
    const top = q[0];
    q.shift(); // 시간 복잡도 고려
    // G라면 break;
    if (board[top[0][0]][top[0][1]] === "G") {
      answer = top[1];
      break;
    }
    board[top[0][0]][top[0][1]] = "V";
    for (let i = 0; i < dir.length; i++) {
      // R위치 최신화
      const next = [top[0][0], top[0][1]];
      while (
        !(
          next[0] + dir[i][0] < 0 ||
          next[0] + dir[i][0] >= n ||
          next[1] + dir[i][1] < 0 ||
          next[1] + dir[i][1] >= m ||
          board[next[0] + dir[i][0]][next[1] + dir[i][1]] === "D"
        )
      ) {
        next[0] = next[0] + dir[i][0];
        next[1] = next[1] + dir[i][1];
      }
      if (next[0] < 0 || next[0] >= n || next[1] < 0 || next[1] >= m) continue;
      if (board[next[0]][next[1]] === "D" || board[next[0]][next[1]] === "V")
        continue;
      q.push([next, top[1] + 1]);
    }
  }
  return answer;
}
