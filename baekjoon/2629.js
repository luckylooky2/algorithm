// 양팔저울 : 동적 계획법, 배낭 문제
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [weightCount] = input[0];
const weights = input[1];
const [ballCount] = input[2];
const balls = input[3];
const totalWeight = weights.reduce((acc, curr) => acc + curr);
const dp = new Array(2)
  .fill(null)
  .map(() =>
    new Array(weightCount + 1)
      .fill(null)
      .map(() => new Array(totalWeight + 1).fill(0))
  );
const dptable = dp[0];
const visited = dp[1];
const answer = [];

for (let i = 1; i <= weightCount; i++) {
  const curr = weights[i - 1];
  for (let j = 1; j <= totalWeight; j++) {
    // 현재 추를 사용하지 않는 경우
    if (dptable[i - 1][j]) {
      dptable[i][j] = 1;
      visited[i][j] = 0;
    }
    // 현재 추를 사용하는 경우
    if (j === curr) {
      if (dptable[i][j]) {
        // 이미 완성된 경우
        if (j + curr <= totalWeight) {
          dptable[i][j + curr] = 1;
          visited[i][j + curr] = 1;
        }
      } else {
        // 이미 완성되지 않은 경우
        dptable[i][j] = 1;
        visited[i][j] = 1;
      }
    } else {
      // 아직 추를 사용하지 않았으므로, 현재 + curr 만큼의 무게도 잴 수 있다
      if (dptable[i][j] && !visited[i][j] && j + curr <= totalWeight) {
        dptable[i][j + curr] = 1;
        visited[i][j + curr] = 1;
      }
      // 아직 추를 사용하지 않았으므로, Math.abs(현재 - curr) 만큼의 무게도 잴 수 있다
      const diff = Math.abs(curr - j);
      if (dptable[i][j] && !visited[i][j] && diff <= totalWeight) {
        dptable[i][diff] = 1;
        visited[i][diff] = 1;
      }
    }
  }
}

for (const ball of balls) {
  answer.push(dptable[weightCount][ball] ? "Y" : "N");
}

console.log(answer.join(" "));
