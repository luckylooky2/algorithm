// 도넛과 막대 그래프 : 그래프
function solution(edges) {
  var answer = new Array(4).fill(0);
  const candidates = [];
  const starts = {};
  const ends = {};
  let max = -Infinity;
  for (const [start, end] of edges) {
    if (starts[start] === undefined) {
      starts[start] = 1;
    } else {
      starts[start]++;
      if (starts[start] === 2) {
        candidates.push(start);
      }
    }
    if (ends[end] === undefined) {
      ends[end] = 1;
    } else {
      ends[end]++;
    }
    max = Math.max(max, start, end);
  }
  for (const elem of candidates) {
    if (ends[elem] === undefined) {
      answer[0] = elem;
      break;
    }
  }
  const newEdges = [];
  const graph = new Array(max + 1).fill(null).map(() => new Array(0));
  const startNode = [];
  for (const [start, end] of edges) {
    if (start !== answer[0]) {
      newEdges.push([start, end]);
      graph[start].push(end);
    } else {
      startNode.push(end);
    }
  }
  const visited = new Array(max + 1).fill(false);
  for (const start of startNode) {
    let [curr, next] = [start, graph[start]];
    let isEight = false;
    while (true) {
      // 끝이 연결되어 있지 않으면, 막대 그래프
      if (starts[curr] === undefined) {
        answer[2]++;
        break;
      }
      // 끝이 연결되어 있으면, 도넛 혹은 8자 그래프
      if (next.length === 0) {
        isEight ? answer[3]++ : answer[1]++;
        break;
      } else if (next.length === 1) {
        visited[curr] = true;
        curr = next.shift();
        next = graph[curr];
      } else {
        // 출구가 2개인 지점에 들른다면, 8자 그래프
        // 아니면, 도넛 그래프
        isEight = true;
        while (visited[next[0]]) {
          next.shift();
        }
        if (next.length === 1) {
          visited[curr] = true;
        }
        curr = next.shift();
        next = graph[curr];
      }
    }
  }
  return answer;
}

// 90'11" / 60'00"

// 그래프를 순회해서 풀 수도 있지만, 그래프의 특성으로만 푸는 방법도 있을 듯?
