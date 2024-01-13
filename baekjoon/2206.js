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
const visited = new Array(2)
  .fill(null)
  .map(() => new Array(n).fill(null).map(() => new Array(m).fill(0)));
const dir = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
const q = [[0, 0, 0]];
let firstIndex = 0;
let lastIndex = q.length;
let isBreak = false;
visited[0][0][0] = 1;
visited[1][0][0] = 1;

while (firstIndex !== lastIndex) {
  const [currX, currY, breakCnt] = q[firstIndex];
  firstIndex++; // pop
  if (currX === m - 1 && currY === n - 1) {
    console.log(visited[breakCnt][currY][currX]);
    isBreak = true;
    break;
  }
  for (let i = 0; i < dir.length; i++) {
    const [nextX, nextY] = [currX + dir[i][0], currY + dir[i][1]];
    const [nextnextX, nextnextY] = [nextX + dir[i][0], nextY + dir[i][1]];
    if (
      nextX < 0 ||
      nextX >= m ||
      nextY < 0 ||
      nextY >= n ||
      visited[breakCnt][nextY][nextX] > 0
    ) {
      continue;
    }
    // jump count도 확인해야 함
    if (
      map[nextY][nextX] === 1 &&
      !(nextnextX < 0 || nextnextX >= m || nextnextY < 0 || nextnextY >= n) &&
      map[nextnextY][nextnextX] === 0 &&
      breakCnt === 0
    ) {
      visited[breakCnt + 1][nextnextY][nextnextX] =
        visited[breakCnt][currY][currX] + 2;
      q.push([nextnextX, nextnextY, breakCnt + 1]); // push
      lastIndex++;
      continue;
    }
    if (map[nextY][nextX] === 1) {
      continue;
    } else {
      visited[breakCnt][nextY][nextX] = visited[breakCnt][currY][currX] + 1;
      q.push([nextX, nextY, breakCnt]); // push
      lastIndex++;
    }
  }
  if (isBreak) {
    break;
  }
}
if (!isBreak) {
  console.log(-1);
}

// 말이 되고픈 원숭이와 거의 비슷한 문제
// 시간 초과가 발생한 이유를 찾지 못하다가 js array가 문제라는 것을 꺠달음
// 어떤 케이스인지는 모르겠으나 queue에 굉장히 많은 데이터가 들어가면(맵의 크기와도 관계가 있나?) shift 연산에 O(n)이 소요되므로 시간 초과 발생할 여지가 있음
// 1. 일반 큐로 대체하는 방법 => 구현하는데 시간이 걸림
// 2. firstIndex, lastIndex 인덱스(포인터)를 사용하는 방법 => 메모리 초과 가능성이 존재
