// 등수 찾기 : 그래프, 너비 우선 탐색, 깊이 우선 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [studentNum, questionCnt, target] = input.shift();
const questions = input;
let [first, last] = [1, studentNum];
const wins = {};
const losts = {};

for (const [win, lost] of questions) {
  if (wins[win]) {
    wins[win].push(lost);
  } else {
    wins[win] = [lost];
  }

  if (losts[lost]) {
    losts[lost].push(win);
  } else {
    losts[lost] = [win];
  }
}

function solve(target, db) {
  const visited = new Array(studentNum + 1).fill(false);
  let res = 0;
  const q = [target];
  let qIdx = 0;

  let curr;
  while (qIdx < q.length) {
    const first = q[qIdx++];
    curr = db[first];
    if (curr) {
      for (const elem of curr) {
        if (visited[elem] === false) {
          q.push(elem);
          visited[elem] = true;
          res++;
        }
      }
    }
  }

  return res;
}

last -= solve(target, wins);
first = solve(target, losts) + 1;

console.log([first, last].join(" "));

// 위상 정렬?
// - 단계를 고려하지 않고 제일 종단에 있는 노드를 먼저 처리하기 때문에, 단계에 대한 정보를 구할 수 없음

// 플로이드-워셜?
// - 모든 노드들의 선후 관계를 구하는 방법
// - 이 문제에서는 하나 등수만 찾으면 되기 때문에, 모든 관계를 구할 필요가 없음. 구하려고 해도 시간 초과 발생
// - 1613(역사) 문제는 모든 관계를 구해야 했음

// BFS
// - 승리, 패배 기준으로 객체(또는 배열)에 각각 진 사람, 이긴 사람의 인덱스를 배열로 저장
// - 배열의 요소를 모두 돌며 1) 큐에 저장 2) visited 배열에 표시하여 중복 방지 => 반복
// - 중복되지 않게 진 사람, 이긴 사람의 수를 카운트하여 계산
