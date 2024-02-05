// 세 용액 : 정렬, 이분 탐색, 투 포인터
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const sortFunction = (a, b) => a - b;
const solutions = input.shift().slice().sort(sortFunction);
let answer = [[], Infinity];

function binarySearch(start, end, target, arr) {
  if (start === end) {
    return start;
  }

  const mid = Math.floor((start + end) / 2);
  // 내림차순 배열
  if (arr[mid] > target) {
    return binarySearch(mid + 1, end, target, arr);
  } else {
    return binarySearch(start, mid, target, arr);
  }
}

function lowerBound(target, arr) {
  return binarySearch(0, arr.length, target, arr);
}

for (let i = 0; i < n; i++) {
  const first = solutions[i];
  const sliced = solutions.slice(i + 2, solutions.length).reverse();
  for (let j = i + 1; j < n - 1; j++) {
    const second = solutions[j];
    const sum = first + second;
    const currIndex = lowerBound(-1 * sum, sliced);
    // 각각 curr, prev
    const candidates = [sliced[currIndex], sliced[currIndex - 1]];
    const curr = candidates[0];
    if (curr !== undefined && curr === sum) {
      answer = [[first, second, curr], 0];
      break;
    } else {
      for (let candidate of candidates) {
        if (candidate !== undefined) {
          const abs = Math.abs(candidate + sum);
          if (abs < answer[1]) {
            answer = [[first, second, candidate], abs];
          }
        }
      }
      sliced.pop();
    }
  }
}

console.log(answer[0].sort(sortFunction).join(" "));

// 다른 문제와 다르게 "선택한 배열에서 선택한 것을 제외하고 나머지 배열을 사용"해야 함

// 1. 서로 다른 3개 => dfs? 시간 초과가 뜰 것
// 2. 선택한 2개를 제외하고 새로운 배열을 만드는 방법? 이분 탐색을 사용하기 위해
// - 해당 2개를 저장 => Infinity로 수정 => 정렬 => pop 2번 => 탐색 => push 2번 => 정렬
// - 여기서 정렬 자체가 nlogn => 수정 필요
// - 즉, 안쪽 for 문 안에서는 선형 또는 O(n) 시간 복잡도를 사용하지 않고 상수 시간 안에 해결해야 함
// 3. 상수 시간 안에 해결
// - 전제 : 현재 선택한 second의 왼쪽 원소는 고려하지 않아도 됨
// - e.g. [ -97, -6, -2, 6, 98 ] 에서 (-2, 6)을 골랐다면 왼쪽에 있는 -97, -6은 고려하지 않아도 됨
// - why? 이미 고려했으므로. -97은 이전 (-97, -2)에서 이미 확인. -6은 이전 (-6, -2)에서 이미 확인
// - second의 오른쪽만 고려하면 되므로 관리가 쉬워짐
// - 전제 : 반복문에서 왼쪽에서 오른쪽으로 순회하므로 다음 차례에서는 새로 slice를 할 필요없이 stack(queue)를 활용 가능
// - 안쪽 for 문을 들어가기 전에 slice(O(n))를 하고 반복문 내부에서는 stack(queue)를 pop 연산을 하면 상수 시간 내에 이분 탐색 배열을 관리 가능
// - js에서는 편의를 위해 queue 대신 stack 사용 => push 연산은 사용하지 않을 것이므로 reverse() + pop 연산을 사용
// - reverse() 결과 배열(stack)이 내림차순 되어 있으므로 lowerBound() 함수도 변경
// - lowerBound 결과 키가 존재할 수도, 존재하지 않을 수도 있음
// - 존재하는 경우, 합이 0이 되므로 전체 로직 종료
// - 존재하지 않는 경우, 미만인 수를 찾게 되는데 하나 이전 인덱스에 있는 원소도 같이 검사해야 함(차이의 절대값이 작은 원소를 고르는 것이므로)
