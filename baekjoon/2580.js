const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const blank = [];
let finished = false;

input.map((v, i) =>
  v.map((v, j) => {
    if (v === 0) {
      blank.push([i, j]);
    }
  })
);

function check(x, y, next) {
  let lst = [x];
  // 행 확인
  if (input[x].includes(next)) return false;
  // 열 확인
  for (let i = 0; i < 9; i++) if (i !== x && input[i][y] === next) return false;
  // 사각형 확인
  let rangeX = Math.floor(x / 3) * 3;
  let rangeY = Math.floor(y / 3) * 3;
  for (let i = rangeX; i < rangeX + 3; i++) {
    for (let j = rangeY; j < rangeY + 3; j++) {
      if (input[i][j] === next) return false;
    }
  }
  return true;
}

function sudoku(depth = 0) {
  if (depth === blank.length) {
    console.log(input.map((v) => v.map((v) => `${v}`).join(" ")).join("\n"));
    finished = true;
    return;
  }
  const [x, y] = blank[depth];
  for (let i = 1; i < 10; i++) {
    if (!check(x, y, i)) {
      continue;
    }
    input[x][y] = i;
    sudoku(depth + 1);
    if (finished === true) break;
    input[x][y] = 0;
  }
}

sudoku();

// sudoku 체크 함수
function _check(lst) {
  // 틀린 부분 출력
  const newLst = [...lst];
  newLst.sort();
  for (let i = 0; i < newLst.length; i++) {
    if (newLst[i] !== i + 1) {
      console.log(lst);
      break;
    }
  }
  for (let i = 0; i < 9; i++) {
    for (let j = i + 1; j < 9; j++) {
      if (newLst[i] === newLst[j]) return false;
    }
  }
  return true;
}

function sudokuCheck() {
  const firstCoord = [
    [0, 0],
    [3, 0],
    [6, 0],
    [0, 3],
    [3, 3],
    [3, 6],
    [0, 6],
    [3, 6],
    [6, 6],
  ];

  // 행 검사
  for (let i = 0; i < 9; i++) {
    if (!_check(input[i])) return false;
  }

  // 열 검사
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let lst = [];
      lst.push(input[j][i]);
      if (!_check(input[i])) return false;
    }
  }

  // 사각형 검사
  for (let i = 0; i < firstCoord.length; i++) {
    let lst = [];
    for (let j = firstCoord[i][0]; j < firstCoord[i][0] + 3; j++) {
      for (let k = firstCoord[i][1]; k < firstCoord[i][1] + 3; k++) {
        lst.push(input[j][k]);
      }
    }
    if (!_check(lst)) return false;
  }
  return true;
}
