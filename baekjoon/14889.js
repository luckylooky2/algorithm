// 스타트와 링크 : 백트래킹, 브루트 포스
const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10))); // [2, [5, 6], [0, 0, 1, 0]]

const n = input[0][0];
const player = Array.from({ length: input[0] }, () => false);
let result = Infinity;

function combination(r = 0, depth = 0) {
  if (r === n / 2) {
    const teamA = [],
      teamB = [];
    let totalA = 0,
      totalB = 0;

    player.forEach((v, i) => {
      if (v === true) teamA.push(i);
      else teamB.push(i);
    });
    for (let i = 0; i < teamA.length; i++) {
      for (let j = 0; j < teamA.length; j++) {
        if (i != j) {
          totalA += input[teamA[i] + 1][teamA[j]];
          totalB += input[teamB[i] + 1][teamB[j]];
        }
      }
    }
    let diff = Math.abs(totalA - totalB);
    if (diff < result) result = diff;
    return;
  }
  if (depth === n) return;

  player[depth] = true;
  combination(r + 1, depth + 1);
  player[depth] = false;
  combination(r, depth + 1);
}

combination();

console.log(result);
