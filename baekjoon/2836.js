// 수상 택시 : 스위핑, 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, m] = input.shift();
const cases = input
  .filter(([start, end]) => start > end)
  .sort((a, b) => b[0] - a[0]);
let [currStart, currEnd] = [null, null];
let answer = 0;

for (const [e, s] of cases) {
  if (currStart === null) {
    currStart = s;
  }
  if (currEnd === null) {
    currEnd = e;
  }

  if (e > currStart) {
    if (s < currStart) {
      currStart = s;
    }
  } else if (e === currStart) {
    currStart = s;
  } else {
    answer += 2 * (currEnd - currStart);
    currStart = s;
    currEnd = e;
  }
}

answer += 2 * (currEnd - currStart);
console.log(answer + m);

// Try 1
// - 그리디: 실패

// Try 2
// - 스위핑
// - 1) 먼저 나오는 순서(이벤트 포인트 순서)대로 정렬: 수직선을 움직이는 과정을 단순화
// - 2) 현재 범위(이벤트 포인트)에 걸쳐지면 늘리고, 걸쳐지지 않으면 먼저 범위를 지우고 현재 범위로 변경
// - 답 = 전체 길이 + 역주행한 길이 * 2
// - 역방향으로 움직이면, 마지막 지점까지 가기 위해 역방향으로 움직인 만큼의 거리를 다시 정방향으로 움직여야 한다

// 이 문제가 스위핑 알고리즘을 사용하는 이유?
// - 왼쪽에서 오른쪽으로 이동하면서 겹치는 지점을 모두 (효율적으로) 파악하고 관리할 수 있기 때문이다
// - 이벤트 포인트와 겹치면 이벤트 포인트를 적절하게 변경하여, 다음 나올 구간과 겹칠 가능성을 대비한다
// - 이벤트 포인트와 겹치지 않으면 앞으로 이벤트 포인트와 겹칠 가능성이 없으므로, 이전 경우를 모두 제외해도 된다
// - 이 문제와 선 긋기(2170)는 겹치는 지점을 알면 답을 구할 수 있는 문제이다
