// 빛의 경로 사이클 : 브루트 포스, 구현
function solution(grid) {
  grid = grid.map((v) => v.split(""));
  var answer = [];
  const [n, m] = [grid.length, grid[0].length];
  const up = new Array(n + 1).fill(null).map(() => new Array(m).fill(0));
  const down = up.map((v) => v.slice());
  const right = new Array(n).fill(null).map(() => new Array(m + 1).fill(0));
  const left = right.map((v) => v.slice());

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      for (let k = 1; k < 5; k++) {
        let [row, col, curr] = [i, j, k];
        let count = 1;
        if (
          (curr === 1 && up[row][col]) ||
          (curr === 2 && down[row][col]) ||
          (curr === 3 && right[row][col]) ||
          (curr === 4 && left[row][col])
        ) {
          continue;
        }
        while (true) {
          if (curr === 1) {
            if (up[row][col]) {
              break;
            } else {
              up[row][col] = count;
            }
            row--;
            if (row === -1) {
              row = n - 1; // m?
              if (up[row + 1][col]) {
                break;
              } else {
                up[row + 1][col] = count;
              }
            }
            count++;
            if (grid[row][col] === "S") {
              curr = 1;
            } else if (grid[row][col] === "L") {
              curr = 4;
            } else if (grid[row][col] === "R") {
              curr = 3;
            }
          } else if (curr === 2) {
            if (down[row + 1][col]) {
              break;
            } else {
              down[row + 1][col] = count;
            }
            row++;
            if (row === n) {
              // m?
              row = 0;
              if (down[row][col]) {
                break;
              } else {
                down[row][col] = count;
              }
            }
            count++;
            if (grid[row][col] === "S") {
              curr = 2;
            } else if (grid[row][col] === "L") {
              curr = 3;
            } else if (grid[row][col] === "R") {
              curr = 4;
            }
          } else if (curr === 3) {
            if (right[row][col + 1]) {
              break;
            } else {
              right[row][col + 1] = count;
            }
            col++;
            if (col === m) {
              // n?
              col = 0;
              if (right[row][col]) {
                break;
              } else {
                right[row][col] = count;
              }
            }
            count++;
            if (grid[row][col] === "S") {
              curr = 3;
            } else if (grid[row][col] === "L") {
              curr = 1;
            } else if (grid[row][col] === "R") {
              curr = 2;
            }
          } else if (curr === 4) {
            if (left[row][col]) {
              break;
            } else {
              left[row][col] = count;
            }
            col--;
            if (col === -1) {
              col = m - 1; // n?
              if (left[row][col + 1]) {
                break;
              } else {
                left[row][col + 1] = count;
              }
            }
            count++;
            if (grid[row][col] === "S") {
              curr = 4;
            } else if (grid[row][col] === "L") {
              curr = 2;
            } else if (grid[row][col] === "R") {
              curr = 1;
            }
          }
        }
        if (count > 1) {
          answer.push(count - 1);
        }
      }
    }
  }
  return answer.sort((a, b) => a - b);
}

// 121'51" / 60'00"

// 사이클을 확인하고 방문한 노드를 기록하는 로직 : up, down, right, left 방향 배열 자료 구조와 현재 방향(curr)

// 사이클을 돈 다음 시작 위치를 결정해야 하는데 up, down, right, left 배열을 기준으로 할 경우 추가 행과 열 때문에 차이가 생김
// grid 배열을 기준으로 해야 함 => 브루트 포스

// 오름차순 정렬, count === 1일 떄 제외
