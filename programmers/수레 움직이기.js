// 수레 움직이기 : 브루트 포스, 너비 우선 탐색, 구현
var answer = Infinity;
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function terminate(maze, curr, end, flag) {
  if (curr[0] === end[0] && curr[1] === end[1]) {
    return 0;
  }
  const q = [curr];
  const [n, m] = [maze.length, maze[0].length];

  while (q.length) {
    const [currR, currC] = q.shift();
    for (const [dR, dC] of dir) {
      const [nextR, nextC] = [currR + dR, currC + dC];
      if (
        nextR >= n ||
        nextR < 0 ||
        nextC >= m ||
        nextC < 0 ||
        maze[nextR][nextC][flag] > 0 ||
        maze[nextR][nextC][0] === 5 ||
        maze[nextR][nextC][0] === 5 - flag
      ) {
        continue;
      }
      maze[nextR][nextC][flag] = maze[currR][currC][flag] + 1;
      q.push([nextR, nextC, maze[nextR][nextC][flag]]);
      if (nextR === end[0] && nextC === end[1]) {
        return maze[nextR][nextC][flag] - maze[curr[0]][curr[1]][flag];
      }
    }
  }
  return null;
}

function backtrack(maze, currRed, currBlue, redEnd, blueEnd, depth = 0) {
  const [n, m] = [maze.length, maze[0].length];

  if (currRed[0] === redEnd[0] && currRed[1] === redEnd[1]) {
    // currBlue => blueEnd
    const copy = maze.map((v) => v.map((v) => v.slice()));
    const res = terminate(copy, currBlue, blueEnd, 2);
    if (res !== null) {
      answer = Math.min(
        answer,
        Math.max(
          maze[currRed[0]][currRed[1]][1] - 1,
          maze[currBlue[0]][currBlue[1]][2] - 1 + res
        )
      );
    }
    return;
  }

  if (currBlue[0] === blueEnd[0] && currBlue[1] === blueEnd[1]) {
    // currRed => redEnd
    const copy = maze.map((v) => v.map((v) => v.slice()));
    const res = terminate(copy, currRed, redEnd, 1);
    if (res !== null) {
      answer = Math.min(
        answer,
        Math.max(
          maze[currRed[0]][currRed[1]][1] - 1 + res,
          maze[currBlue[0]][currBlue[1]][2] - 1
        )
      );
    }
    return;
  }

  for (let i = 0; i < dir.length; i++) {
    const [dR_red, dC_red] = dir[i];
    const nextRed = [currRed[0] + dR_red, currRed[1] + dC_red];
    if (
      nextRed[0] >= n ||
      nextRed[0] < 0 ||
      nextRed[1] >= m ||
      nextRed[1] < 0 ||
      maze[nextRed[0]][nextRed[1]][1] > 0 ||
      maze[nextRed[0]][nextRed[1]][0] === 5
    ) {
      continue;
    }
    for (let j = 0; j < dir.length; j++) {
      const [dR_blue, dC_blue] = dir[j];
      const nextBlue = [currBlue[0] + dR_blue, currBlue[1] + dC_blue];
      if (
        nextBlue[0] >= n ||
        nextBlue[0] < 0 ||
        nextBlue[1] >= m ||
        nextBlue[1] < 0 ||
        (nextRed[0] === nextBlue[0] && nextRed[1] === nextBlue[1]) ||
        (currRed[0] === nextBlue[0] &&
          currRed[1] === nextBlue[1] &&
          currBlue[0] === nextRed[0] &&
          currBlue[1] === nextRed[1]) ||
        maze[nextBlue[0]][nextBlue[1]][2] > 0 ||
        maze[nextBlue[0]][nextBlue[1]][0] === 5
      ) {
        continue;
      }
      // maze update
      maze[nextRed[0]][nextRed[1]][1] = maze[currRed[0]][currRed[1]][1] + 1;
      maze[nextBlue[0]][nextBlue[1]][2] = maze[currBlue[0]][currBlue[1]][2] + 1;
      backtrack(maze, nextRed, nextBlue, redEnd, blueEnd, depth + 1);
      maze[nextRed[0]][nextRed[1]][1] = 0;
      maze[nextBlue[0]][nextBlue[1]][2] = 0;
    }
  }
}

function solution(maze) {
  maze = maze.map((v) =>
    v.slice().map((v) => {
      const arr = new Array(3).fill(0);
      arr[0] = v;
      return arr;
    })
  );
  let redStart, blueStart, redEnd, blueEnd;
  const [n, m] = [maze.length, maze[0].length];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (maze[i][j][0] === 1) {
        redStart = [i, j];
      } else if (maze[i][j][0] === 2) {
        blueStart = [i, j];
      } else if (maze[i][j][0] === 3) {
        redEnd = [i, j];
      } else if (maze[i][j][0] === 4) {
        blueEnd = [i, j];
      }
    }
  }
  maze[redStart[0]][redStart[1]][1] = 1;
  maze[blueStart[0]][blueStart[1]][2] = 1;
  backtrack(maze, redStart, blueStart, redEnd, blueEnd);
  return answer === Infinity ? 0 : answer;
}

// 각각의 칸을 단일 값에서 [ 원래 값, red 이동 횟수, blue 이동 횟수 ]로 3차원으로 변경하여 값을 저장하는 방법을 사용

// 이중 for 문을 잘못 사용하면, 안쪽 수레 조건을 움직이지 못해 바깥쪽 이동하는 수레도 움직이지 않는 상황이 발생할 수 있다
// - 처음에는 nextRed, nextBlue 좌표를 고정하는 방법을 하려고 했지만, 바닥 조건 설정 등이 쉽지 않았다
// - red, blue 중 하나가 목표 지점에 도착하면, 나머지를 BFS를 통해 목표 지점까지 옮기는 방법으로 해결하였다

// 조건
// - nextRed가 currBlue이고 nextBlue가 currRed 즉, 서로 자리가 바뀐 경우를 제외
// - nextRed와 nextBlue가 같은 경우 즉, 같은 경우로 이동하려는 경우도 제외
// - 조건을 바깥쪽 수레에서 판단하지 않는다
// - 마지막 BFS에는 상대방 목표 지점도 제외하는 조건이 필요하다(전제)
