// 합이 0인 네 정수 : 이분 탐색, 정렬, 투 포인터
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const sortFunction = (a, b) => a - b;
const reversed = new Array(4).fill(null).map(() => new Array(n));
let answer = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < 4; j++) {
    reversed[j][i] = input[i][j];
  }
}

const sorted = reversed.map((v) => v.slice().sort(sortFunction));
let arrayToSearch = [];

for (let i = 0; i < n; i++) {
  const prev = sorted[2][i];
  for (let j = 0; j < n; j++) {
    arrayToSearch.push(prev + sorted[3][j]);
  }
}

arrayToSearch = arrayToSearch.slice().sort(sortFunction);

function binarySearch(start, end, target, arr) {
  if (start === end) {
    return start;
  }
  const mid = Math.floor((start + end) / 2);
  if (arr[mid] < target) {
    return binarySearch(mid + 1, end, target, arr);
  } else {
    return binarySearch(start, mid, target, arr);
  }
}

function lower_bound(target, arr) {
  return binarySearch(0, arr.length, target, arr);
}

for (let i = 0; i < n; i++) {
  const prev = sorted[0][i];
  for (let j = 0; j < n; j++) {
    const curr = prev + sorted[1][j];
    const negative = -1 * curr;
    const endIndex = lower_bound(negative + 1, arrayToSearch);
    const startIndex = lower_bound(negative, arrayToSearch);

    answer += endIndex - startIndex;
  }
}

console.log(answer);

// js는 통과가 어렵나? c++ 보다 시간이 느리기 때문에...(이 문제는 c++로 시간이 딱 맞음)
// 시간 초과 => 나중에 최적화를 해보자
// 일단, 풀이법은 c++ 버전과 같음
