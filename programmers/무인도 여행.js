// 무인도 여행 : 깊이 우선 탐색
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function dfs(i, j, map, days) {
  const rowLen = map.length;
  const colLen = map[0].length;
  days.push(map[i][j]);
  map[i][j] = "X";
  for (let k = 0; k < dir.length; k++) {
    const [dx, dy] = dir[k];
    if (
      i + dx < 0 ||
      i + dx >= rowLen ||
      j + dy < 0 ||
      j + dy >= colLen ||
      map[i + dx][j + dy] === "X"
    )
      continue; // 조건 확인
    dfs(i + dx, j + dy, map, days);
  }
}

function solution(maps) {
  var answer = [];
  const map = maps.map((v) =>
    v.split("").map((v) => (v !== "X" ? parseInt(v, 10) : v))
  );
  const rowLen = map.length;
  const colLen = map[0].length;
  let days = [];
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (map[i][j] !== "X") {
        dfs(i, j, map, days);
        answer.push(days.reduce((a, b) => a + b));
        days = [];
      }
    }
  }
  if (!answer.length) answer.push(-1);
  return answer.sort((a, b) => a - b);
}
