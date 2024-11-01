// 전깃줄 - 2 : 가장 긴 증가하는 부분 수열, 이분 탐색
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const lines = input.sort((a, b) => a[0] - b[0]);
const lis = [];
const record = [];
const answer = [];

function binarySearch(arr, target, start = 0, end = arr.length - 1) {
  if (arr.length === 0) {
    return null;
  }

  if (start === end) {
    return start;
  }

  const mid = Math.floor((start + end) / 2);
  if (arr[mid] < target) {
    return binarySearch(arr, target, mid + 1, end);
  } else {
    return binarySearch(arr, target, start, mid);
  }
}

for (const [from, to] of lines) {
  const index = binarySearch(lis, to);
  if (index === null) {
    lis.push(to);
    record.push(0);
  } else if (index === lis.length - 1) {
    if (lis[index] > to) {
      // 왜 바꾸지? 만약에 뒤에 추가될 숫자가 있으면 그 때를 위해 캐싱
      // 그럼 여기서 배열을 수정하는 것이 의미가 있어지는 때는 언제인가?
      lis[index] = to;
      record.push(index);
    } else if (lis[index] < to) {
      // 뒤에 추가하는 것은 수정하기 전 배열을 사용하겠다는 의미같다.
      lis.push(to);
      record.push(index + 1);
    }
  } else {
    // 왜 바꾸지? 만약에 뒤에 추가될 숫자가 있으면 그 때를 위해 캐싱
    lis[index] = to;
    record.push(index);
  }
}

// 실제 LIS와 LIS가 아닌 배열을 나누는 과정: record 배열이 반드시 필요하다.
const LIS = [];
let lisLength = lis.length - 1;

for (let i = record.length - 1; i >= 0; i--) {
  if (record[i] === lisLength) {
    LIS.push(lines[i][1]);
    lisLength--;
  } else {
    answer.push(lines[i][0]);
  }
}

LIS.reverse();

answer.sort((a, b) => a - b);
console.log(answer.length);
if (answer.length) {
  console.log(answer.join("\n"));
}

// Try 1
// 스택: 마지막 숫자보다 크다면 push, 스택에서 숫자보다 작은 것이 나올 때까지 pop
// - 안 되는 이유?
// - 1. 스택은 항상 이전의 값만 참조
// - 2. 올바른 위치에 삽입이 어려움

// Try 2
// LIS: 이분 탐색
// - 이분 탐색을 통해 LIS 배열에서 들어갈 위치를 확인
// - 가장 마지막 인덱스? 마지막 요소와 크기 비교를 통해 크면 push, 작으면 마지막 인덱스에 할당
// - 아니라면? 해당 인덱스에 할당 => 해당 숫자가 나중에 새로운 수열이 될 수 있으므로 캐싱
// - 캐싱 과정 때문에, LIS 배열은 실제 LIS가 아닐수도 있다.
// - LIS 배열의 길이는 실제 LIS의 길이와 같지만, 요소는 다를수도 있음에 주의해야 한다.

// 실제 LIS는 어떻게 구해야 하나?
// - 현재 요소가 들어갈 인덱스를 저장하는 record 배열이 필요하다.
// - 뒤에서부터 record의 값과 LIS 길이부터 비교하며 찾으면 LIS 길이를 1씩 줄이면서 0이 될 때까지 비교한다.
