// 광물 캐기 : 백트래킹
function calc(minerals, start, pick) {
  let ret = 0;
  const picks = [
    [1, 1, 1],
    [5, 1, 1],
    [25, 5, 1],
  ];
  let i = start * 5;
  let cnt = 0;
  while (i < minerals.length && cnt < 5) {
    switch (minerals[i]) {
      case "diamond":
        ret += picks[pick][0];
        break;
      case "iron":
        ret += picks[pick][1];
        break;
      case "stone":
        ret += picks[pick][2];
        break;
    }
    i++;
    cnt++;
  }
  return ret;
}

const visited = [];
let g_min = Infinity;

function check(picks, visited, i) {
  const res = [0, 0, 0];
  res[i]++;
  visited.map((v) => res[v]++);
  for (let i = 0; i < 3; i++) {
    if (res[i] > picks[i]) return true;
  }
  return false;
}

function dfs(picks, max, dp, depth = 0) {
  if (depth === max) {
    let total = 0;
    for (let i = 0; i < visited.length; i++) total += dp[i][visited[i]];
    g_min = Math.min(g_min, total);
    return;
  }

  for (let i = 0; i < 3; i++) {
    if (check(picks, visited, i)) continue;
    visited.push(i);
    dfs(picks, max, dp, depth + 1);
    visited.pop(i);
  }
}

function solution(picks, minerals) {
  const part = Math.floor(minerals.length / 5) + 1;
  const dp = new Array(part).fill(null).map(() => new Array(3).fill(0));
  const picksNum = picks.reduce((a, b) => a + b);
  for (let i = 0; i < part; i++)
    for (let j = 0; j < 3; j++) dp[i][j] = calc(minerals, i, j);
  dfs(picks, picksNum < part ? picksNum : part, dp);
  return g_min;
}
