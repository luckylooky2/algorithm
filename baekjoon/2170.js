// 선 긋기 : 정렬, 이분 탐색, 스위핑
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const inputs = input.sort((a, b) => a[0] - b[0]);

const lines = {};

function upperBound(arr, curr, s = 0, e = arr.length - 1) {
  const mid = Math.floor((s + e) / 2);

  if (s === e) {
    const [left, right] = [Number(arr[s][0]), arr[s][1]];
    const [start, end] = curr;
    if (end < left || start > right) {
      lines[start] = end;
    } else if (left <= start && end <= right) {
    } else {
      const [newStart, newEnd] = [Math.min(left, start), Math.max(end, right)];
      delete lines[start];
      lines[newStart] = newEnd;
    }
    return;
  }

  if (Number(arr[s][0]) >= curr[0]) {
    upperBound(arr, curr, s, mid);
  } else {
    upperBound(arr, curr, mid + 1, e);
  }
}

for (const [start, end] of inputs) {
  const arr = Object.entries(lines).sort((a, b) => Number(a[0]) - Number(b[0]));

  if (arr.length) {
    upperBound(arr, [start, end]);
  } else {
    lines[start] = end;
  }
}

console.log(
  Object.entries(lines)
    .map(([start, end]) => [Number(start), end])
    .reduce((arr, curr) => arr + (curr[1] - curr[0]), 0)
);

// lower bound => upper bound

// 1. upper bound 식이 틀렸음 => 큰 게 나오면 오른쪽으로 가야 하는데, 왼쪽으로 감
// - 정답 : Number(arr[s][0]) >= curr[0], 오답 : Number(arr[s][0]) <= curr[0]

// 2. 인덱스 맞추기
// - 정답 : e = arr.length - 1, 오답 : e = arr.length

// 3. Object.entries()가 정렬이 되지 않기 때문에 정렬 필요
// - O(n^2)이 될 수 있어서, 위 풀이는 틀릴 가능성이 있음
// - 시작 지점으로 정렬을 하면, 시작 지점보다 이전 구간의 끝 지점이 작다면 절대 겹칠 일이 없으므로 앞의 경우는 생각하지 않아도 됨 => O(n)에 해결
