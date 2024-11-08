// 현수막 걸기 : 이분 탐색, 브루트 포스, 정렬
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n, m, r] = input.shift();
const points = input.shift().sort((a, b) => a - b);
const pillars = input.shift().sort((a, b) => a - b);
const cache = new Map();
let answer = -1;

function binarySearch(arr, target, start = 0, end = arr.length - 1) {
  if (start === end) {
    return start;
  }
  const mid = Math.floor((start + end) / 2);
  if (arr[mid] <= target) {
    return binarySearch(arr, target, mid + 1, end);
  } else {
    return binarySearch(arr, target, start, mid);
  }
}

function calc(pillars, index, width) {
  const height = pillars[index];
  const area = ((height * width) / 2).toFixed(1);
  cache.set(width, area);
  if (area <= r) {
    answer = Math.max(answer, area);
  }
}

for (let i = 0; i < points.length - 1; i++) {
  for (let j = i + 1; j < points.length; j++) {
    const width = points[j] - points[i];
    // 중복 제거
    if (!cache.get(width) && width) {
      const target = (r * 2) / width;
      const index = binarySearch(pillars, target);
      index > 0 && calc(pillars, index - 1, width);
      calc(pillars, index, width);
      index < pillars.length - 1 && calc(pillars, index + 1, width);
    }
  }
}

console.log(answer === -1 ? -1 : answer.toFixed(1));

// 정렬이 되지 않았다는 것을 늦게 알음
// - 나눗셈으로 인한 오차는 크게 문제가 없었던 듯?
