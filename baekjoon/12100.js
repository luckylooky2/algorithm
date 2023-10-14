// 2048(Easy) : 시뮬레이션, 백트래킹, 브루트 포스
let arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = arr.shift();
const visited = [];
const UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3;
let answer = -Infinity;

for (let i = 0; i < n; i++)
  for (let j = 0; j < n; j++) answer = Math.max(arr[i][j], answer);

function check(changed, x, y) {
  for (let i = 0; i < changed.length; i++)
    if (changed[i][0] === x && changed[i][1] === y) return false;
  return true;
}

function move(dir) {
  const changed = [];
  let k = 1;
  if (dir === UP) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (arr[i][j] !== 0) {
          // 1. 옮김
          while (i - k >= 0 && arr[i - k][j] === 0) {
            arr[i - k][j] = arr[i - k + 1][j];
            arr[i - k + 1][j] = 0;
            k++;
          }
          // 2. 합침, 이미 합쳐진 블록을 다시 합치지 않도록 확인이 필요
          if (
            i - k >= 0 &&
            arr[i - k][j] === arr[i - k + 1][j] &&
            check(changed, i - k, j)
          ) {
            changed.push([i - k, j]);
            arr[i - k][j] = arr[i - k][j] * 2;
            answer = Math.max(arr[i - k][j], answer);
            arr[i - k + 1][j] = 0;
          }
        }
      }
    }
  } else if (dir === RIGHT) {
    for (let j = n - 1; j >= 0; j--) {
      for (let i = 0; i < n; i++) {
        if (arr[i][j] !== 0) {
          // 1. 옮김
          while (j + k < n && arr[i][j + k] === 0) {
            arr[i][j + k] = arr[i][j + k - 1];
            arr[i][j + k - 1] = 0;
            k++;
          }
          // 2. 합침
          if (
            j + k < n &&
            arr[i][j + k] === arr[i][j + k - 1] &&
            check(changed, i, j + k)
          ) {
            changed.push([i, j + k]);
            arr[i][j + k] = arr[i][j + k] * 2;
            answer = Math.max(arr[i][j + k], answer);
            arr[i][j + k - 1] = 0;
          }
        }
      }
    }
  } else if (dir === DOWN) {
    for (let i = n - 1; i >= 0; i--) {
      for (let j = 0; j < n; j++) {
        if (arr[i][j] !== 0) {
          // 1. 옮김
          while (i + k < n && arr[i + k][j] === 0) {
            arr[i + k][j] = arr[i + k - 1][j];
            arr[i + k - 1][j] = 0;
            k++;
          }
          // 2. 합침
          if (
            i + k < n &&
            arr[i + k][j] === arr[i + k - 1][j] &&
            check(changed, i + k, j)
          ) {
            changed.push([i + k, j]);
            arr[i + k][j] = arr[i + k][j] * 2;
            answer = Math.max(arr[i + k][j], answer);
            arr[i + k - 1][j] = 0;
          }
        }
      }
    }
  } else if (dir === LEFT) {
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        if (arr[i][j] !== 0) {
          // 1. 옮김
          while (j - k >= 0 && arr[i][j - k] === 0) {
            arr[i][j - k] = arr[i][j - k + 1];
            arr[i][j - k + 1] = 0;
            k++;
          }
          // 2. 합침
          if (
            j - k >= 0 &&
            arr[i][j - k] === arr[i][j - k + 1] &&
            check(changed, i, j - k)
          ) {
            changed.push([i, j - k]);
            arr[i][j - k] = arr[i][j - k] * 2;
            answer = Math.max(arr[i][j - k], answer);
            arr[i][j - k + 1] = 0;
          }
        }
      }
    }
  }
}

function dfs(depth = 0) {
  if (depth === 5) {
    return;
  }

  for (let i = 0; i < 4; i++) {
    const copy = arr.map((v) => v.map((v) => v));

    visited.push(i);
    // move
    move(i);
    dfs(depth + 1);
    visited.pop();
    // restore
    arr = copy;
  }
}

dfs();
console.log(answer);
