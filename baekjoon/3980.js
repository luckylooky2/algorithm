// 선발 명단 : 백트래킹, 브루트 포스
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input[0];
const cases = [];
const answer = [];

for (let i = 0, j = 1; i < n; i++, j += 11) {
  cases.push(input.slice(j, j + 11));
}

for (const status of cases) {
  const candidates = new Array(11).fill(null).map(() => new Array(0));
  let max = 0;
  function recur(arr, depth = 0, visited = [], sum = 0) {
    if (depth === 11) {
      max = Math.max(max, sum);
      return;
    }

    for (let i = 0; i < arr[depth].length; i++) {
      const [value, index] = arr[depth][i];
      if (visited.includes(index)) {
        continue;
      }
      visited.push(index);
      recur(arr, depth + 1, visited, sum + value);
      visited.pop();
    }
  }
  for (let i = 0; i < 11; i++) {
    const elem = status[i];
    for (let j = 0; j < elem.length; j++) {
      if (elem[j] > 0) {
        candidates[i].push([elem[j], j]);
      }
    }
  }

  recur(candidates);
  answer.push(max);
}

console.log(answer.join("\n"));

// Try 1
// - dp : 2차원 dp 실패(충분히 모든 케이스를 고려하지 못함)
// - 0인 값이 고려 대상이라고 생각함(사실 아니었음)

// Try 2
// - 백트래킹 혹은 브루트 포스
// - 5^11
