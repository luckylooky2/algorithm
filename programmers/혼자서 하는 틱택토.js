// 혼자서 하는 틱택토 : 시뮬레이션
function check(board) {
  // 가로, 세로와 대각선을 같이 세도 됨 => ["OOO", "XOX", "XXO"]
  let totalO = 0,
    totalX = 0;
  let slashLeftO = 0,
    slashLeftX = 0,
    slashRightO = 0,
    slashRightX = 0;
  // 가로, 세로
  for (let i = 0; i < 3; i++) {
    let rowO = 0,
      colO = 0,
      rowX = 0,
      colX = 0;
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "O") rowO++;
      if (board[j][i] === "O") colO++;
      if (board[i][j] === "X") rowX++;
      if (board[j][i] === "X") colX++;
    }
    if (rowO === 3) totalO++;
    if (colO === 3) totalO++;
    if (rowX === 3) totalX++;
    if (colX === 3) totalX++;
    // 대각선
    if (board[i][i] === "O") slashLeftO++;
    if (board[i][i] === "X") slashLeftX++;
    if (board[i][2 - i] === "O") slashRightO++;
    if (board[i][2 - i] === "X") slashRightX++;
  }
  if (slashLeftO === 3) totalO++;
  if (slashLeftX === 3) totalX++;
  if (slashRightO === 3) totalO++;
  if (slashRightX === 3) totalX++;
  // 2개 이상은 확인하지 않아도 됨 => ["XOX", "OOO", "XOX"], ["OXO", "XOX", "OXO"], ["OOO", "OXX", "OXX"]
  if (totalO === 1 && totalX === 1) return "CANT";
  else if (totalO > 0) return "O";
  else if (totalX > 0) return "X";
  else return "NO";
}

function solution(board) {
  var answer = 1;
  let numO = 0,
    numX = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "O") numO++;
      else if (board[i][j] === "X") numX++;
    }
  }
  // 1. 개수 조건
  if (numO < numX || numO > numX + 1) return 0;
  // 2. 게임이 끝난 후에도 말을 더 놓음 && 동시 승 조건
  const result = check(board);
  if (result === "O" && numO !== numX + 1) return 0;
  if (result === "X" && numO !== numX) return 0;
  if (result === "CANT") return 0;
  return answer;
}
