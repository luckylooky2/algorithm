// 루돌프 월드컵 : 브루트 포스, 정렬
const f = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split(" ")
  .map((v) => +v);
const team = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 2],
  [1, 3],
  [2, 3],
];
const match = [3, 1, 0];
let answer = 0;

function result(visit) {
  const score = [0, 0, 0, 0];
  let p = 1;

  for (let i = 0; i < 6; i++) {
    const matchResult = visit[i];
    const [firstTeam, secondTeam] = team[i];
    const below = 5 * (f[firstTeam] + f[secondTeam]);

    if (matchResult === 3) {
      score[firstTeam] += 3;
      p *= (4 * f[firstTeam]) / below;
    } else if (matchResult === 1) {
      score[firstTeam] += 1;
      score[secondTeam] += 1;
      p *= (f[firstTeam] + f[secondTeam]) / below;
    } else {
      score[secondTeam] += 3;
      p *= (4 * f[secondTeam]) / below;
    }
  }

  const rank = score
    .map((v, i) => [i, v])
    .sort((a, b) => {
      const res = b[1] - a[1];
      if (res === 0) {
        return a[0] - b[0];
      } else {
        return b[1] - a[1];
      }
    });

  for (let i = 0; i < 4; i++) {
    const [team, score] = rank[i];
    if (team === 0 && i <= 1) {
      answer += p;
    }
  }
}

(function combination(visit = []) {
  if (visit.length === 6) {
    result(visit);
    return;
  }

  for (const c of match) {
    visit.push(c);
    combination(visit);
    visit.pop();
  }
})();

console.log((answer * 100).toFixed(3));
