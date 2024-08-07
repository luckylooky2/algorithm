// 벽 부수고 이동하기 : 그래프, 너비 우선 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = input
  .shift()
  .split(" ")
  .map((v) => Number(v));
const map = input.map((v) => v.split("").map((v) => Number(v)));
// [2][n][m] => [n][m][2]
const visited = new Array(n)
  .fill(null)
  .map(() => new Array(m).fill(null).map(() => new Array(2).fill(0)));
const dir = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
const q = [[0, 0, 0]];
let index = 0;
let isEnd = false;
visited[0][0][0] = 1;
visited[0][0][1] = 1;

while (index < q.length) {
  const [currX, currY, breakCnt] = q[index++];
  if (currY === n - 1 && currX === m - 1) {
    console.log(visited[currY][currX][breakCnt]);
    isEnd = true;
    break;
  }
  for (let i = 0; i < dir.length; i++) {
    const [nextX, nextY] = [currX + dir[i][0], currY + dir[i][1]];
    if (
      nextX < 0 ||
      nextX >= m ||
      nextY < 0 ||
      nextY >= n ||
      // cf> bfs는 한 번 방문한 곳이 가장 최단 거리임을 보장?
      visited[nextY][nextX][breakCnt] > 0
    ) {
      continue;
    }

    if (map[nextY][nextX] === 0) {
      visited[nextY][nextX][breakCnt] = visited[currY][currX][breakCnt] + 1;
      q.push([nextX, nextY, breakCnt]);
    } else if (map[nextY][nextX] === 1 && breakCnt === 0) {
      visited[nextY][nextX][1] = visited[currY][currX][0] + 1;
      q.push([nextX, nextY, 1]);
    }
  }
}

// console.log(visited.map((v) => v.map((v) => v[0]).join(" ")).join("\n"));
// console.log("--------------------------");
// console.log(visited.map((v) => v.map((v) => v[1]).join(" ")).join("\n"));

if (!isEnd) {
  console.log(-1);
}

// 말이 되고픈 원숭이와 거의 비슷한 문제
// 시간 초과가 발생한 이유를 찾지 못하다가 js array가 문제라는 것을 꺠달음
// 어떤 케이스인지는 모르겠으나 queue에 굉장히 많은 데이터가 들어가면(맵의 크기와도 관계가 있나?) shift 연산에 O(n)이 소요되므로 시간 초과 발생할 여지가 있음
// 1. 일반 큐로 대체하는 방법 => 구현하는데 시간이 걸림
// 2. index, q.length 인덱스(포인터)를 사용하는 방법 => 메모리 초과 가능성이 존재

// 재채점 실패
// - why? 문제를 정확히 이해하지 못함
// - 벽을 뚫고 반드시 같은 방향으로 이동해야 하는 건 아님
// - 즉, 같은 방향의 nextnext를 고려하지 않아도 됨

// 3차원 배열 [0], [1]을 나눠야 하는 이유
// - 한 번 뛰었는지, 안 뛰었는지에 따라 값을 따로 저장하고 있어야 함
