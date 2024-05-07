// 파일 합치기 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const caseLen = Number(input.shift());
const answer = [];

for (let i = 0; i < caseLen; i++) {
  const n = Number(input[2 * i + 0]);
  const arr = input[2 * i + 1].split(" ").map((v) => Number(v));
  const dp = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(0));
  const sum = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(0));

  // init
  for (let i = 1; i < n; i++) {
    dp[i][i + 1] = arr[i - 1] + arr[i];
    sum[i][i + 1] = dp[i][i + 1];
  }

  for (let i = 2; i < n; i++) {
    for (let j = 1; j + i <= n; j++) {
      const [start, end] = [j, j + i];
      let min = Infinity;
      let prevMin = Infinity;
      const [fs, fe] = [start, end - 1];
      const [ss, se] = [start + 1, end];
      min = Math.min(
        min,
        dp[fs][fe] + arr[end - 1],
        dp[ss][se] + arr[start - 1]
      );
      prevMin = Math.min(prevMin, sum[fs][fe], sum[ss][se]);
      const candidates = [];
      const count = end - start + 1;
      for (let k = 2; k < count - 1; k++) {
        candidates.push([k, count - k]);
      }
      for (const [a, b] of candidates) {
        min = Math.min(min, dp[start][end - a] + dp[start + b][end]);
        prevMin = Math.min(prevMin, sum[start][end - a] + sum[start + b][end]);
      }
      dp[start][end] = min;
      sum[start][end] = min + prevMin;
    }
  }
  answer.push(sum[1][n]);
}

console.log(answer.join("\n"));

// 66'25"

// 기본적으로 행렬 곱셈 순서(11049) 문제와 비슷
// - 차이점 : 11049는 누적합 자체로 답이었지만, 이 문제는 누적합을 해온 경로의 누적합의 최소값을 구하는 문제
// - 현재 dp 테이블의 누적합 이외에, 현재 경로까지의 누적합의 최소값을 따로 저장할 sum 테이블이 필요
// - 하나의 테이블로는 불가능
// - 현재 칸에 들어올 수 있는 이전 단계까지의 누적합의 최소값을 구한 뒤, 현재 칸의 min 값과 더해서 sum 테이블을 채움
