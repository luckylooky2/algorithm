// N-Queen : 백트래킹, 브루트 포스
const fs = require("fs");
const input = parseInt(fs.readFileSync("/dev/stdin").toString().trim(), 10);

let count = 0;

function cannotPlace(result, currentRow) {
  let offset;
  for (let i = 1; i < currentRow; i++) {
    offset = currentRow - i;
    // 같은 열 검사
    if (result[i] === result[currentRow]) return true;
    // 대각선 검사
    if (
      result[i] + offset === result[currentRow] ||
      result[i] - offset === result[currentRow]
    )
      return true;
  }
  return false;
}

function nQueen(n, r = 0, result = [], depth = 0) {
  result[depth] = r;
  // 유망성 검사
  if (depth > 1 && cannotPlace(result, depth)) {
    return;
  }
  // 해 검사
  if (n === depth) {
    count++;
    return;
  }

  for (let i = 1; i <= input; i++) {
    nQueen(n, i, result, depth + 1);
  }
}

nQueen(input);

console.log(count);
