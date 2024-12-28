// 차트 : 브루트 포스, 깊이 우선 탐색
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const groups = input.shift();
let answer = 0;

function check(visit) {
  const times = visit.map((v) => groups[v]);
  let culumative = [0];
  for (let i = 0; i < times.length - 1; i++) {
    culumative.push(culumative.at(-1) + times[i]);
  }
  let res = 0;
  for (let i = 0; i < culumative.length; i++) {
    if (culumative.includes(culumative[i] + 50)) {
      res++;
    }
  }
  answer = Math.max(answer, res);
}

// 완전 탐색
(function dfs(visit = []) {
  if (visit.length === n) {
    check(visit);
    return;
  }

  for (let i = 0; i < n; i++) {
    if (visit.includes(i)) {
      continue;
    }
    visit.push(i);
    dfs(visit);
    visit.pop();
  }
})();

console.log(answer);
