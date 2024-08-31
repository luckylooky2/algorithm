// 선 긋기 : 정렬, 스위핑
const input = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
// 시작 지점 오름차순 정렬
const lines = input.sort((a, b) => a[0] - b[0]);
let answer = 0n;
let [start, end] = [null, null];

for (const [left, right] of lines) {
  if (start === null && end === null) {
    start = left;
    end = right;
    continue;
  }
  if (end < left) {
    answer += BigInt(Math.abs(end - start));
    start = left;
    end = right;
  } else if (end < right) {
    end = right;
  }
}

answer += BigInt(Math.abs(end - start));

console.log(String(answer));

// lower bound => upper bound

// 1. upper bound 식이 틀렸음 => 큰 게 나오면 오른쪽으로 가야 하는데, 왼쪽으로 감
// - 정답 : Number(arr[s][0]) >= curr[0], 오답 : Number(arr[s][0]) <= curr[0]

// 2. 인덱스 맞추기
// - 정답 : e = arr.length - 1, 오답 : e = arr.length

// 3. Object.entries()가 정렬이 되지 않기 때문에 정렬 필요
// - O(n^2)이 될 수 있어서, 위 풀이는 틀릴 가능성이 있음
// - 시작 지점으로 정렬을 하면, 시작 지점보다 이전 구간의 끝 지점이 작다면 절대 겹칠 일이 없으므로 앞의 경우는 생각하지 않아도 됨 => O(n)에 해결

// 4. 스위핑
// - 분리 집합으로도 풀 수는 있을 듯?
// - 정렬: start가 왼쪽으로 확장하는 것을 고려하지 않아도 됨
// - 분리 집합이 확정될 때, 차이를 결과 값에 합산
