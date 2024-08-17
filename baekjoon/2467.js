// 용액 : 이분 탐색
const input = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input[0];
const arr = input[1];
const sorted = arr.sort((a, b) => a - b);
const answer = [Infinity, [0, 0]];

function binarySearch(arr, target, start = 0, end = arr.length - 1) {
  const mid = Math.floor((start + end) / 2);

  if (start === end) {
    return start;
  }

  if (target > arr[mid]) {
    return binarySearch(arr, target, mid + 1, end);
  } else {
    return binarySearch(arr, target, start, mid);
  }
}

for (let i = 0; i < sorted.length; i++) {
  const curr = sorted[i];
  const resultIndex = binarySearch(sorted, -curr);
  const candidates = [resultIndex];
  if (resultIndex !== 0) {
    candidates.push(resultIndex - 1);
  }

  if (resultIndex !== sorted.length - 1) {
    candidates.push(resultIndex + 1);
  }

  for (const candidate of candidates) {
    if (sorted[candidate] === curr) {
      continue;
    }

    const diff = Math.abs(sorted[candidate] + curr);

    if (answer[0] > diff) {
      answer[0] = diff;
      answer[1] = [curr, sorted[candidate]];
    }
  }
}

console.log(answer[1].sort((a, b) => a - b).join(" "));

// 메모리 초과
// - 입력: 12 bytes * 100,000 개 = 1.2 MB
// - arr: 8 bytes * 100,000 개 = 0.8 MB
// - sorted: 8 bytes * 100,000 개 = 0.8 MB
// - 여기까지는 메모리 초과가 발생하지 않음
// - rest 배열을 반복문을 돌면서 생성하면 GC가 돌기 전에 메모리 초과가 발생할 수도
// - 기존 sorted 배열을 그대로 사용하되, -1을 곱한 값을 이분 탐색으로 탐색하고 결과 인덱스 + 앞, 뒤 3개를 검사
