// 미로 탈출 : 너비 우선 탐색
function count(q, map, target) {
  const copy = map.map((v) => v.map((v) => v));
  copy[q[0][0]][q[0][1]] = 0;
  const rowNum = copy.length;
  const colNum = copy[0].length;
  const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  while (q.length !== 0) {
    const top = q.shift();
    for (let i = 0; i < dir.length; i++) {
      const next = [top[0] + dir[i][0], top[1] + dir[i][1]];
      if (
        next[0] < 0 ||
        next[0] >= rowNum ||
        next[1] < 0 ||
        next[1] >= colNum ||
        copy[next[0]][next[1]] > 0 ||
        copy[next[0]][next[1]] === "X"
      )
        continue;
      if (copy[next[0]][next[1]] === target) return copy[top[0]][top[1]] + 1;
      copy[next[0]][next[1]] = copy[top[0]][top[1]] + 1;
      q.push(next);
    }
  }
  return undefined;
}

function solution(maps) {
  var answer = 0;
  let q = [];
  let lever;
  const map = maps.map((v) => v.split(""));
  const rowNum = map.length;
  const colNum = map[0].length;
  for (let i = 0; i < rowNum; i++) {
    for (let j = 0; j < colNum; j++) {
      if (map[i][j] === "S") q.push([i, j]);
      else if (map[i][j] === "L") lever = [i, j];
    }
  }
  answer += count(q, map, "L");
  if (isNaN(answer)) return -1;
  q = [[...lever]];
  answer += count(q, map, "E");
  if (isNaN(answer)) return -1;
  return answer;
}
