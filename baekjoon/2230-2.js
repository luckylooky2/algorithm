// 수 고르기 : 이분 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v, 10));
const arr = input.map((v) => parseInt(v, 10)).sort((a, b) => a - b);
let answer = arr.length === 1 ? 0 : Infinity;

function check(mid, value) {
  const diff = Math.abs(arr[mid] - value);
  if (diff >= m) {
    answer = Math.min(answer, diff);
    return true;
  }
  return false;
}

for (value of arr) {
  let s = 0,
    e = arr.length - 1;
  while (s <= e) {
    const mid = Math.ceil((s + e) / 2);
    if (check(mid, value)) {
      s = mid;
    } else {
      e = mid - 1;
    }
    if (mid === e) break;
  }
}
console.log(answer);

// 하나의 현재 원소와 검색하는 원소와의 차이가 m 보다 크도록 이분 탐색
// 문제 : value가 작을 때는 diff 값을 크게 하기 위해서 오른쪽으로 옮겨야 하는데, value가 클 때는 diff 값을 작게 하기 위해서 왼쪽으로 옮겨야 함
// 여기서 문제가 복잡해지고 세지 못하는 경우의 수가 발생할 수 있음

// 로직을 통일하려면 한 방향(뒷 방향)으로 찾아야 하는데, 결국은 lowerBound 찾는 로직과 같아짐
// arr[mid] >= m + value(즉, arr[mid] - value >= m)을 만족하는 최대 인덱스를 찾음
