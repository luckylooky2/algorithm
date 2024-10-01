// 보물 지도: 그래프, 너비 우선 탐색
function init(n, m, hole) {
  const map = new Array(2)
    .fill(null)
    .map(() =>
      new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(Infinity))
    );
  for (let i = 0; i <= m; i++) {
    map[0][i][0] = -1;
    map[1][i][0] = -1;
  }
  for (let i = 0; i <= n; i++) {
    map[0][0][i] = -1;
    map[1][0][i] = -1;
  }

  for (const [y, x] of hole) {
    map[0][x][y] = -1;
    map[1][x][y] = -1;
  }
  map[0][1][1] = 1;
  map[1][1][1] = 1;
  return map;
}

function solution(n, m, hole) {
  var answer = 0;
  const map = init(n, m, hole);
  const start = [1, 1, 0, 1];
  const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const q = [start];
  let idx = 0;

  while (idx < q.length) {
    const [currX, currY, isJumped, count] = q[idx++];
    if (currX === m && currY === n) {
      // 도착
      answer = map[isJumped][currX][currY];
      break;
    }

    for (const [dx, dy] of dir) {
      const [nextX, nextY] = [currX + dx, currY + dy];
      if (nextX < 1 || nextX >= m + 1 || nextY < 1 || nextY >= n + 1) {
        continue;
      }
      // nextnext를 확인해야 하기 때문에, 확실히 불가능한 경우가 아니라면 continue를 하면 안 된다
      // - 확실히 불가능한 경우: next가 맵을 넘어가는 경우, nextnext를 확인할 필요가 없음
      // - 가능할수도 있는 경우: next가 -1인 경우와 next가 count + 1보다 큰 경우, nextnext와는 독립적인 상황이다
      if (
        map[isJumped][nextX][nextY] !== -1 &&
        map[isJumped][nextX][nextY] > count + 1
      ) {
        map[isJumped][nextX][nextY] = count + 1;
        q.push([nextX, nextY, isJumped, count + 1]);
      }

      if (!isJumped) {
        const [nextnextX, nextnextY] = [currX + dx * 2, currY + dy * 2];
        if (
          nextnextX < 1 ||
          nextnextX >= m + 1 ||
          nextnextY < 1 ||
          nextnextY >= n + 1 ||
          map[1][nextnextX][nextnextY] <= count + 1 ||
          map[1][nextnextX][nextnextY] === -1
        ) {
          continue;
        }
        map[1][nextnextX][nextnextY] = count + 1;
        q.push([nextnextX, nextnextY, 1, count + 1]);
      }
    }
  }

  return answer - 1;
}

// Try 1
// - -1(구멍)이 있을 때만 점프할 수 있는지 확인하도록 구현
// - 건너 뛸 수 없는 구멍이 있을 떄에는 1층에서 점프를 해야 하는데, 이를 고려하지 않음
// - e.g. 4, 4, [[2, 2], [2, 3], [3, 2], [3, 3]] => expected: 5, output: 6

// Try 2
// - 모든 점에서 점프를 하도록 반복문을 구성한다
// - cf> 도착 지점에 추가할 때, 로직을 끝내고 된다
