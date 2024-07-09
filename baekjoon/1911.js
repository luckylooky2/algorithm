// 흙길 보수하기 : 스위핑, 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, l] = input.shift();
const puddles = input;
const sortedByStartingPointAscend = puddles.sort((a, b) => a[0] - b[0]);
let [start, end] = [null, null];
let answer = 0;

for (const [nextStart, nextEnd] of sortedByStartingPointAscend) {
  if (start === null && end === null) {
    start = nextStart;
    end = nextEnd;
    continue;
  }

  const count = Math.ceil((end - start) / l);
  const availableLen = count * l;
  if (start + availableLen >= nextStart) {
    end = Math.max(end, nextEnd); // 완전히 포함될 경우에는 end가 더 크므로
  } else {
    answer += count;
    start = nextStart;
    end = nextEnd;
  }
}

answer += Math.ceil((end - start) / l);

console.log(answer);

// n과 l의 위치를 거꾸로 생각

// 스위핑 알고리즘
// - 경우의 수를 전부 고려하지 않고 중요한 사건들만을 중심으로 알고리즘을 수행하는 방식으로 동작
// - 이벤트 포인트(선이 특정 점을 지날 때 발생하는 사건)들은 미리 정렬되어 있고, 선이 움직이면서 각 포인트를 방문하여 처리
