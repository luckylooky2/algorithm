const { readSync } = require("fs");

// 하노이의 탑 이동 순서 : 재귀 호출
const n = parseInt(
  require("fs").readFileSync("/dev/stdin").toString().trim(),
  10
);
const answer = [];

function recur(from, to, n) {
  if (n === 1) {
    answer.push(`${from} ${to}`);
    return;
  }

  // 6 - from - to
  // 첫 번째 재귀 : 1을 기준으로 2와 3이 번갈아 나와야 하기 때문에
  recur(from, 6 - from - to, n - 1);
  answer.push(`${from} ${to}`);
  // 두 번째 재귀 : 2를 기준으로 1과 3이 번갈아 나와야 하기 때문에
  recur(6 - from - to, to, n - 1);
}

recur(1, 3, n);
console.log(answer.length);
console.log(answer.join("\n"));
