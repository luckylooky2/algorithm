// 서울 지하철 2호선 : 그래프, 깊이 우선 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const edges = input;
// 연결된 모든 노드
const linkedWith = new Array(n + 1).fill(null).map(() => new Array(0));
const answer = new Array(n + 1).fill(null);

for (const [a, b] of edges) {
  linkedWith[a].push(b);
  linkedWith[b].push(a);
}

// 임의의 한 간선을 잡아서 순환 구간을 찾는다
let curr = edges[0];
const visited = [curr[0]];
let flag = true;

findCircleLine(curr[0], visited, linkedWith);

function findCircleLine(curr, visited, linkedWith) {
  const adjacentNode = linkedWith[curr];
  for (const node of adjacentNode) {
    if (visited.includes(node)) {
      continue;
    }
    visited.push(node);
    findCircleLine(node, visited, linkedWith);
    visited.pop();
  }
  // dfs를 돌며, 연결된 노드가 2개 이상인 현재 노드(거의 대부분의 노드)가 루프를 완성했는지 검사
  // 움직일 수 없는 상황(linkedWith[curr]에서 더 이상 뻗어나갈 곳이 없을 때)에 검사 시작
  // - 하나씩 스택에서 빼면서 검사 => 새로운 길이 나오면 끝까지 뻗어나간 후 => 마찬가지로 하나씩 스택에서 빼면서 검사
  // - 여기에 코드를 적는 것은 위와 같은 흐름을 발생시킨다
  if (linkedWith[curr].length >= 2 && flag) {
    solve(curr, visited, linkedWith);
  }

  // case
  // 4-5-6-7-8-4
  // 1-3-4
  // 2-3-4

  // 순서
  // 현재 노드:  8 / 현재 방문한 노드:  1 3 4 5 6 7 8
  // 현재 노드:  12 / 현재 방문한 노드:  1 3 4 5 6 7 9 12
  // 현재 노드:  9 / 현재 방문한 노드:  1 3 4 5 6 7 9
  // 현재 노드:  11 / 현재 방문한 노드:  1 3 4 5 6 7 10 11
  // 현재 노드:  10 / 현재 방문한 노드:  1 3 4 5 6 7 10
  // 현재 노드:  7 / 현재 방문한 노드:  1 3 4 5 6 7
  // 현재 노드:  6 / 현재 방문한 노드:  1 3 4 5 6
  // 현재 노드:  5 / 현재 방문한 노드:  1 3 4 5
  // 현재 노드:  5 / 현재 방문한 노드:  1 3 4 8 7 6 5
  // 현재 노드:  6 / 현재 방문한 노드:  1 3 4 8 7 6
  // 현재 노드:  12 / 현재 방문한 노드:  1 3 4 8 7 9 12
  // 현재 노드:  9 / 현재 방문한 노드:  1 3 4 8 7 9
  // 현재 노드:  11 / 현재 방문한 노드:  1 3 4 8 7 10 11
  // 현재 노드:  10 / 현재 방문한 노드:  1 3 4 8 7 10
  // 현재 노드:  7 / 현재 방문한 노드:  1 3 4 8 7
  // 현재 노드:  8 / 현재 방문한 노드:  1 3 4 8
  // 현재 노드:  4 / 현재 방문한 노드:  1 3 4
  // 현재 노드:  2 / 현재 방문한 노드:  1 3 2
  // 현재 노드:  3 / 현재 방문한 노드:  1 3
  // 현재 노드:  1 / 현재 방문한 노드:  1
}

function countBranchLine(curr, visited, linkedWith, loop, dist) {
  if (answer[curr]) {
    return;
  }

  answer[curr] = dist;
  const adjacentNode = linkedWith[curr];
  for (const node of adjacentNode) {
    if (visited.includes(node) || loop.includes(node)) {
      continue;
    }
    visited.push(node);
    countBranchLine(node, visited, linkedWith, loop, dist + 1);
    visited.pop();
  }
}

function solve(curr, visited, linkedWith) {
  let index;
  const prev = visited.at(-2);

  // visited 배열에서 루프 시작점 찾기
  for (let i = 0; i < linkedWith[curr].length; i++) {
    const candidate = linkedWith[curr][i];
    // prev는 이미 고려했으므로
    if (candidate !== prev) {
      for (let j = 0; j < visited.length; j++) {
        const compare = visited[j];
        if (candidate === compare) {
          index = j;
        }
      }
    }
  }

  if (index === undefined) {
    return;
  }

  let loop = visited.slice(index);
  for (const node of loop) {
    answer[node] = 0;
  }

  let candidates = [];
  // 지선의 시작 지점 찾기
  for (let i = 0; i < loop.length; i++) {
    const nodes = linkedWith[loop[i]];
    for (const node of nodes) {
      if (!loop.includes(node)) {
        candidates.push(node);
      }
    }
  }

  for (const candidate of candidates) {
    if (answer[candidates]) {
      continue;
    }
    countBranchLine(candidate, [candidate], linkedWith, loop, 1);
  }
  flag = false;
}

console.log(answer.slice(1).join(" "));

// Try 1
// - 인접한 노드를 저장한 배열에서 길이가 3 이상인 배열을 후보 배열에 push: 지선이 존재하는 정점
// - 후보 배열에서 인접한 노드 배열을 순회하면서, DFS로 배열의 길이가 1이 나올 때까지 현재 정점을 변경하며 반복(이미 방문한 곳은 제외)
// - 순환이라면 visited 배열이 모두 true로 바뀌면서 반복문 탈출
// - 지선에서 또 지선이 갈라지는 경우를 제외하곤 통과
// - 길이가 3 이상인 배열이 순환선에서 시작하지 않을 수도 있음. 카운트가 복잡해짐 => case 1

// Try 2
// - dfs
// - 1) 순환선을 구하고 2) 지선이 시작하는 부분부터 끝까지 카운트
// 움직일 수 없는 상황(linkedWith[curr]에서 더 이상 뻗어나갈 곳이 없을 때)에 검사 시작
// - 하나씩 스택에서 빼면서 검사 => 새로운 길이 나오면 끝까지 뻗어나간 후 => 마찬가지로 하나씩 스택에서 빼면서 검사

// case 1
// 4-5-6-7-8-4
// 1-3-4
// 2-3-4

// case 2
// 1-2-3-1
// 2-4-5
// 3-6-8
// 3-6-9
// 3-7

// expected : 0 0 0 1 2 1 1 2 2
// output : 0 0 0 1 2 2 1 3 1
