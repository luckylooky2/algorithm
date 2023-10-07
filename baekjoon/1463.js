// 1로 만들기 : 동적 계획법, 너비 우선 탐색
const Queue = require("./queue");

const n = parseInt(
  require("fs").readFileSync("/dev/stdin").toString().trim(),
  10
);

// dp ver.
const dp = new Array(3).fill(null).map(() => new Array(n + 1).fill(0));

// 첫 번째 row
for (let i = 0; i < 2; i++) {
  let j = 3 - i;
  let cnt = 1;
  while (j <= n) {
    dp[i][j] = cnt++;
    j *= 3 - i;
  }
}

// 두 번째 row
for (let i = 2; i <= n; i++) {
  if (i % 3 === 0) {
    if (dp[0][i]) dp[1][i] = dp[0][i];
    else {
      const divide = i / 3;
      if (dp[1][divide]) dp[1][i] = 1 + dp[1][divide];
    }
  }
}

// 세 번째 row
for (let i = 2; i <= n; i++) {
  if (dp[1][i] === 0) {
    let res = Infinity;
    if (i % 3 === 0) res = Math.min(dp[2][i / 3] + 1, res);
    if (i % 2 === 0) res = Math.min(dp[2][i / 2] + 1, res);
    dp[2][i] = Math.min(dp[2][i - 1] + 1, res);
  } else dp[2][i] = dp[1][i];
}

console.log(dp[2][n]);

// bfs ver.
// const q = new Queue();
// const dir = [1, 2, 3];
// const map = new Array(n + 2).fill(0);
// let flag = false;

// if (n !== 1) q.push(1);
// else return console.log(0);

// map[1] = 0;
// while (q.size !== 0) {
//   const front = q.head.value;
//   q.pop();
//   for (let i = 0; i < dir.length; i++) {
//     let next;
//     if (i === 0) next = front + dir[i];
//     else next = front * dir[i];
//     if (next < 0 || next > n + 1 || map[next] > 0) continue;
//     q.push(next);
//     map[next] = map[front] + 1;
//   }
//   if (flag) break;
// }

// console.log(map[n]);
