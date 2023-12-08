// 연결 요소의 개수 : 그래프, 너비 우선 탐색
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, m] = arr.shift();
const visited = new Array(n + 1).fill(false);
let answer = 0;

// ver.1
// const q = [];

// function findFirstIndex(arr) {
//   for (let i = 0; i < arr.length; i++) if (arr[i][0] !== -1) return i;
//   return -1;
// }

// function addToQueue(arr, toFind, q, visited) {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i][0] === toFind) {
//       if (!visited[arr[i][1]]) {
//         q.push(arr[i][1]);
//         visited[arr[i][1]] = true;
//       }
//       arr[i][0] = -1;
//       arr[i][1] = -1;
//     }
//     if (arr[i][1] === toFind) {
//       if (!visited[arr[i][0]]) {
//         q.push(arr[i][0]);
//         visited[arr[i][0]] = true;
//       }
//       arr[i][0] = -1;
//       arr[i][1] = -1;
//     }
//   }
// }

// while (true) {
//   const firstIndex = findFirstIndex(arr);
//   if (firstIndex === -1) break;
//   q.push(arr[firstIndex][0]);
//   q.push(arr[firstIndex][1]);
//   visited[arr[firstIndex][0]] = true;
//   visited[arr[firstIndex][1]] = true;
//   arr[firstIndex][0] = -1;
//   arr[firstIndex][1] = -1;
//   while (q.length !== 0) {
//     const top = q.shift();
//     addToQueue(arr, top, q, visited);
//   }
//   answer++;
// }

// // 연결되지 않은 노드 정답에 추가
// for (let i = 1; i < visited.length; i++) {
//   if (!visited[i]) answer++;
// }

// console.log(answer);

// ver.2 인접 리스트를 이용한
const graph = {};

for (let i = 0; i < arr.length; i++) {
  if (!graph[arr[i][0]]) graph[arr[i][0]] = [arr[i][1]];
  else graph[arr[i][0]].push(arr[i][1]);
  if (!graph[arr[i][1]]) graph[arr[i][1]] = [arr[i][0]];
  else graph[arr[i][1]].push(arr[i][0]);
}

for (let i = 1; i <= n; i++) {
  if (visited[i]) continue;
  answer++;
  const q = [i];
  visited[i] = true;
  while (q.length !== 0) {
    const top = q.shift();
    if (!graph[top]) break;
    for (let node of graph[top]) {
      if (!visited[node]) {
        q.push(node);
        visited[node] = true;
      }
    }
  }
}

console.log(answer);
