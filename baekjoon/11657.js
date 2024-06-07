// 타임머신 : 그래프, 최단 경로, 플로이드-워셜, 벨만-포드
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, m] = input.shift();
const lines = input;
const times = new Array(n + 1)
  .fill(null)
  .map(() => new Array(n + 1).fill(Infinity));
let flag = false;
const answer = [];

for (const [start, end, time] of lines) {
  times[start][end] = Math.min(times[start][end], time);
}

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    for (let k = 1; k <= n; k++) {
      times[j][k] = Math.min(times[j][k], times[j][i] + times[i][k]);
    }
  }
}

// 조건 추가
// 음의 루프가 있다 하더라도 1번과 연결되지 않으면 의미가 없다
for (let i = 2; i <= n; i++) {
  if (times[1][i] !== Infinity && times[i][i] < 0) {
    flag = true;
    break;
  }
}

if (flag) {
  console.log(-1);
} else {
  for (let i = 2; i <= n; i++) {
    answer.push(times[1][i] === Infinity ? -1 : times[1][i]);
  }
  console.log(answer.join("\n"));
}

// 3 2
// 2 3 -1
// 3 2 -2

// output
// -1

// expected
// -1
// -1
