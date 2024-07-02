// 앱 : 배낭 문제, 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, m] = input.shift();
let target = m;
const [memories, costs] = [[], []];
let answer = Infinity;
for (let i = 0; i < n; i++) {
  if (input[1][i] === 0) {
    target -= input[0][i];
    continue;
  }
  memories.push(input[0][i]);
  costs.push(input[1][i]);
}

const costTotal = costs.reduce((acc, curr) => acc + curr, 0);
const dp = new Array(memories.length + 1)
  .fill(null)
  .map(() => new Array(costTotal + 1).fill(0));

for (let memoryIndex = 1; memoryIndex <= memories.length; memoryIndex++) {
  for (let costIndex = 0; costIndex <= costTotal; costIndex++) {
    const curr = costs[memoryIndex - 1];
    const memory = memories[memoryIndex - 1];

    // 틀렸던 부분
    if (costIndex >= curr) {
      dp[memoryIndex][costIndex] = Math.max(
        // 현재 메모리를 사용하는 케이스
        memory + dp[memoryIndex - 1][costIndex - curr],
        // 현재 메모리를 사용하지 않는 케이스
        dp[memoryIndex - 1][costIndex]
      );
    } else {
      dp[memoryIndex][costIndex] = Math.min(dp[memoryIndex - 1][costIndex]);
    }
    if (dp[memoryIndex][costIndex] >= target) {
      answer = Math.min(answer, costIndex);
    }
  }
}

console.log(answer === Infinity ? 0 : answer);

// 행: 메모리, 열: 목표 메모리(m), 값: 최소 비용 => 메모리 초과

// 행: 메모리, 열: 비용, 값: 최소 메모리
// - 최소 메모리가 목표 메모리(m)를 넘는 가장 작은 비용이 답

// 왜 max를 통해 가장 큰 값을 계속 아래 행으로 전달하는가?
// - "현재를 선택하는 경우와 현재를 선택하지 않는 경우 중 큰 값을 고른다"
