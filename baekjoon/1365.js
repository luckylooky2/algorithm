// 꼬인 전깃줄 : 가장 긴 증가하는 부분 수열, 이분 탐색
const input = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input[0];
const arr = input[1];
const lis = [];

function binarySearch(lis, target, start = 0, end = lis.length - 1) {
  const mid = Math.floor((start + end) / 2);
  if (lis.length === 0) {
    return null;
  }

  if (start === end) {
    return start;
  }

  if (lis[mid] >= target) {
    return binarySearch(lis, target, start, mid);
  } else {
    return binarySearch(lis, target, mid + 1, end);
  }
}

for (const elem of arr) {
  const index = binarySearch(lis, elem);
  if (index === null) {
    lis.push(elem);
  } else if (index === lis.length - 1) {
    // 제일 마지막 인덱스가 나온 경우, 업데이트할지 push할지 결정해야 함
    if (lis[index] > elem) {
      // elem이 마지막 요소보다 작다면, 해당 인덱스에 값을 업데이트
      lis[index] = elem;
    } else if (lis[index] < elem) {
      // elem이 LIS에서 가장 큰 수라면, push
      lis.push(elem);
    }
  } else {
    // elem이 인덱스 중간에 위치한다면, 해당 인덱스에 값을 업데이트
    lis[index] = elem;
  }
}

console.log(n - lis.length);

// Try 1
// - 우선순위 큐
// - MinHeap(현재보다 큰 수), MaxHeap(현재보다 작은 수)를 담는 두 우선순위 큐
// - 현재 요소가 들어갈 자리를 구하는 과정(toLeft, toRight)에서 최대 O(n) 소요 => O(n^2)으로 시간 초과 발생

// Try 2
// - 가장 긴 증가하는 부분 수열(LIS)
// - pseudo code
//   -
// - 어떤 부분에서 메모이제이션이 발생하는가?

// 예전에 풀었던 방법
// - 동적 계획법을 이용한 가장 긴 증가하는 부분 수열 찾기
// - O(n^2)이기 때문에 이 문제에서는 시간 초과가 발생
