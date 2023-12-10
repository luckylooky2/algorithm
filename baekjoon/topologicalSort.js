const graph = {
  A: [],
  B: ["A", "C", "D"],
  C: [],
  D: ["C"],
  E: ["D", "G"],
  F: ["E"],
  G: [],
};
const alphabetBase = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabet = {};
const n = Object.keys(graph).length;

function topologicalSort(graph) {
  const arr = [];
  const q = [];
  const n = Object.keys(graph).length;
  const indegrees = new Array(n + 1).fill(Infinity);

  for (let i = 1; i <= n; i++) {
    // indegree 개수 채우기
    indegrees[i] = graph[alphabet[i]].length;
    // 0이라면 큐에 추가
    if (!graph[alphabet[i]].length) q.push(alphabet[i]);
  }

  while (q.length !== 0) {
    // 노드 하나를 꺼내서
    const top = q.shift();
    // 노드와 연결된 간선과 노드를 제거
    for (let i = 1; i <= n; i++) {
      // 현재는 들어오는 방향을 저장했지만, 나가는 방향을 저장한다면
      // 모두 순회하며 확인하는 것이 아니라 배열만 돌며 indegree를 차감할 수 있음
      if (graph[alphabet[i]].includes(top)) {
        indegrees[i]--;
        // 0이 되면 큐에 추가 : 해당 노드를 거쳐 갈 준비가 됨
        // 간선이 사라져서 0개가 되었다는 것은 연결된 모든 노드를 이미 순회했다는 뜻
        if (!indegrees[i]) {
          q.push(alphabetBase[i]);
        }
      }
    }
    arr.push(top);
  }
  return arr;
}

for (let i = 1; i <= 26; i++) alphabet[i] = alphabetBase[i];
const sorted = topologicalSort(graph);
// 순환 그래프 확인 필요
if (sorted.length !== n) console.log("cycle exists.");
else console.log(sorted.join(""));
