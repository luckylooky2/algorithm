// 회사 문화 1 : 그래프, 깊이 우선 탐색, 트리에서의 동적 계획법
const input = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, m] = input[0];
const bossIndex = input[1];
const complimentArr = input.slice(2, 2 + m);
const complimentSum = new Array(n + 1).fill(0);
const answer = new Array(n + 1).fill(0);
// { 상사: 직속 부하[] }
const relation = {};

// relation에 key가 상사이고, value가 직속 부하 배열로 저장
for (let i = 0; i < bossIndex.length; i++) {
  const index = bossIndex[i];
  if (relation[index]) {
    relation[index].push(i + 1);
  } else {
    relation[index] = [i + 1];
  }
}

// 칭찬받은 부하의 value를 누적헤서 저장
for (const [target, value] of complimentArr) {
  complimentSum[target] += value;
}

// 사장부터 직속 부하를 dfs로 순회하면서 sum을 누적시키고 정답 배열에 저장
function recur(target, sum = 0) {
  answer[target] = Math.max(answer[target], sum);

  const arr = relation[target];
  if (arr === undefined) {
    return;
  }
  for (const elem of arr) {
    recur(elem, sum + complimentSum[elem]);
  }
}

recur(-1);

console.log(answer.slice(1).join(" "));
