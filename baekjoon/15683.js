// 감시 : 시뮬레이션, 브루트 포스
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => v));
const [n, m] = arr.shift().map((v) => parseInt(v, 10));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const lst = [];
let cnt = 0;
const visited = [];
let answer = Infinity;

function fill(x, y, dx, dy) {
  let i = 1;
  let changed = [];
  if (dx === -1) {
    while (x - i >= 0 && arr[x - i][y] !== "6") {
      if (arr[x - i][y] === "0") {
        arr[x - i][y] = "#";
        changed.push([x - i, y]);
        cnt--;
      }
      i++;
    }
  } else if (dy === -1) {
    while (y - i >= 0 && arr[x][y - i] !== "6") {
      if (arr[x][y - i] === "0") {
        arr[x][y - i] = "#";
        changed.push([x, y - i]);
        cnt--;
      }
      i++;
    }
  } else if (dx === 1) {
    while (x + i < n && arr[x + i][y] !== "6") {
      if (arr[x + i][y] === "0") {
        arr[x + i][y] = "#";
        changed.push([x + i, y]);
        cnt--;
      }
      i++;
    }
  } else {
    while (y + i < m && arr[x][y + i] !== "6") {
      if (arr[x][y + i] === "0") {
        arr[x][y + i] = "#";
        changed.push([x, y + i]);
        cnt--;
      }
      i++;
    }
  }
  return changed;
}

function rollback(changed) {
  changed.map((v) => {
    arr[v[0]][v[1]] = "0";
  });
  cnt += changed.length;
}

for (let i = 0; i < n; i++)
  for (let j = 0; j < m; j++) if (arr[i][j] === "0") cnt++;

// 5는 미리 처리
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (arr[i][j] === "5")
      for (let k = 0; k < dir.length; k++) fill(i, j, dir[k][0], dir[k][1]);
    else if (
      arr[i][j] === "1" ||
      arr[i][j] === "2" ||
      arr[i][j] === "3" ||
      arr[i][j] === "4"
    )
      lst.push([arr[i][j], [i, j]]);
  }
}

function dfs(depth = 0) {
  if (depth === lst.length) {
    answer = Math.min(cnt, answer);
    return;
  }

  for (let i = 0; i < 4; i++) {
    // i : dir
    visited.push(i);
    let changed = fill(
      lst[depth][1][0],
      lst[depth][1][1],
      dir[i][0],
      dir[i][1]
    );
    switch (lst[depth][0]) {
      case "2":
        const v2 = [1, 0, 3, 2];
        changed = changed.concat(
          fill(lst[depth][1][0], lst[depth][1][1], dir[v2[i]][0], dir[v2[i]][1])
        );
        break;
      case "3":
        const v3 = [3, 2, 0, 1];
        changed = changed.concat(
          fill(lst[depth][1][0], lst[depth][1][1], dir[v3[i]][0], dir[v3[i]][1])
        );
        break;
      case "4":
        const v4 = [
          [3, 1],
          [2, 0],
          [0, 3],
          [1, 2],
        ];
        changed = changed.concat(
          fill(
            lst[depth][1][0],
            lst[depth][1][1],
            dir[v4[i][0]][0],
            dir[v4[i][0]][1]
          )
        );
        changed = changed.concat(
          fill(
            lst[depth][1][0],
            lst[depth][1][1],
            dir[v4[i][1]][0],
            dir[v4[i][1]][1]
          )
        );
        break;
    }
    dfs(depth + 1);
    visited.pop(i);
    rollback(changed);
  }
}

dfs();
console.log(answer);
