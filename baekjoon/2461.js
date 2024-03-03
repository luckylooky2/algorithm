// 대표 선수 : 투 포인터, 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, m] = input.shift();
const classes = input.map((v) => v.sort((a, b) => a - b));
const indexes = new Array(n).fill(0);
let answer = Infinity;

while (true) {
  let min = Infinity;
  let max = -Infinity;
  let minIndex = 0;

  for (let i = 0; i < n; i++) {
    if (min > classes[i][indexes[i]]) {
      min = classes[i][indexes[i]];
      minIndex = i;
    }
    if (max < classes[i][indexes[i]]) {
      max = classes[i][indexes[i]];
    }
  }
  answer = Math.min(answer, max - min);
  indexes[minIndex]++;
  if (indexes[minIndex] === m) {
    break;
  }
}

console.log(answer);

// 1. backtracking : 1000000C1000 => 시간 초과
// 2. two pointer
// - 정렬 후 모두 인덱스 0부터 최대값 - 최소값을 계산
// - 최소값이 있는 반의 인덱스를 증가시키면서 반복 => 최대 1000000 개의 경우의 수(시간 복잡도)
// - js로 하면 시간 초과 발생 (why?)

// 1 2 3 4 5
// 6 7 8 9 10
// 3 4 5 6 7

// - 조합의 개수는 5^3
// - 정렬함으로써 포인터를 움직일 때 경우의 수를 스킵할 수 있게 됨
// - e.g. (4, 6, 4) 상황에서 (1, 6, 4) ~ (3, 6, 4) 경우의 수를 넘길 수 있음 : 항상 열등한 경우
