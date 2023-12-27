// 플로이드 : 그래프, 최단 경로, 플로이드
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const [m] = input.shift();
const map = new Array(n).fill(null).map(() => new Array(n).fill(Infinity));

for (let i = 0; i < n; i++) map[i][i] = 0;

for (let [start, end, cost] of input) {
  start--;
  end--;
  if (map[start][end] > cost) map[start][end] = cost;
}

// O(n^3)
// 거쳐가는 노드가 가장 바깥 반복문이어야 함
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) {
      const currVal = map[j][k];
      const newVal = map[j][i] + map[i][k];
      if (currVal > newVal) map[j][k] = map[j][i] + map[i][k];
    }
  }
}

// 갈 수 없는 경우 0으로 출력
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] === Infinity) map[i][j] = 0;
  }
}

console.log(map.map((v) => v.join(" ")).join("\n"));

// 계산 과정에서 예외 처리를 두지 않기 위해
// [i, i] = 0, 거리를 모르는 경우에는 Infinity로 처리

// e.g. 1 -> 1 -> 2
// if (start === end) continue; 이런 예외 처리를 하지 않고 자연스럽게 넘어갈 수 있는 방법은 1 -> 1을 0으로 만들고
// 1 -> 2가 Infinity인 경우, 덧셈의 결과로 값이 최신화되지 않게 막아줌

// 거쳐가는 노드를 1 -> n 순서대로 처리해도 괜찮은 이유?
// - 동적 프로그래밍을 기반으로 하고 있음

// 플로이드 알고리즘은 노드 약 1000개까지 커버 가능

// 보통 연산보다 대입이 느림
// map[j][k] = Math.min(map[j][k], map[j][i] + map[i][k]); 보다
// if (currVal > newVal) map[j][k] = map[j][i] + map[i][k]; 가 시간 상 유리(크지는 않음)
