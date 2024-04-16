// n^2 배열 자르기 : 구현, 브루트 포스
function solution(n, left, right) {
  const answer = new Array(right - left + 1).fill(0);
  let [leftRow, leftCol] = [Math.floor(left / n), left % n];
  let [rightRow, rightCol] = [Math.floor(right / n), right % n];
  let idx = 0;
  for (let r = leftRow; r <= rightRow; r++) {
    let startCol, endCol;

    if (r === leftRow && r === rightRow) {
      startCol = leftCol;
      endCol = rightCol;
    } else if (r === leftRow) {
      startCol = leftCol;
      endCol = n - 1;
    } else if (r === rightRow) {
      startCol = 0;
      endCol = rightCol;
    } else {
      startCol = 0;
      endCol = n - 1;
    }
    for (let c = startCol; c <= endCol; c++) {
      if (c > r) {
        answer[idx++] = c + 1;
      } else {
        answer[idx++] = r + 1;
      }
    }
  }
  return answer;
}

// 34'05" / 60'00"
