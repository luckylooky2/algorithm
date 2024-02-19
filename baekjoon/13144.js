// List of Unique Numbers : 투 포인터
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const numberArr = input.shift();
let answer = 0;
let p1 = 0,
  p2 = 0;
const arr = [];
const cache = {};

while (p2 < n) {
  const lastElem = numberArr[p2];
  if (cache[lastElem]) {
    // 조정 작업
    while (cache[lastElem]) {
      const firstElem = arr.shift();
      cache[firstElem] = false;
      p1++;
    }
  }
  arr.push(lastElem);
  cache[lastElem] = true;
  answer += arr.length;
  p2++;
}

console.log(answer);

// 시간 초과
// 1. arr.includes(numberArr[p2]) => O(n) 복잡도 소요(해시 테이블로 대체)
// 2. arr.shift() => O(n) 시간 복잡도 소요(처리 안했는데 통과)

// 풀이
// 배열에 값이 하나 추가될 때마다, 경우의 수가 배열 원소 수만큼 늘어난다
// [1, 2, 3] => [1] / [2], [1, 2] / [3], [2, 3], [1, 2, 3]
// [2, 1, 3] => [2] / [1], [2, 1] / [3], [1, 3], [2, 1, 3]
// 경우의 수를 더해주기 전에 중복된 원소를 모두 pop하여 제거한다 => 하나만 존재함을 보장
// 투 포인터로는 "연속된 배열"에서 어떤 작업을 할 때 유용하다
// 스택이나 투 포인터 등을 사용하는 문제에서 로직을 찾을 때에는, 모든 경우의 수를 펼쳐놓고 스택 연산 또는 포인터가 변함에 따라 어떻게 묶을 것인지를 파악해보자
