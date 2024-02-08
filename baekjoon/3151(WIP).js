// 합이 0 : 정렬, 이분 탐색, 투 포인터
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const sortFunction = (a, b) => a - b;
const students = input.shift().sort(sortFunction);
const binarySearch = function (start, end, target, arr) {
  if (start === end) {
    return start;
  }

  const mid = Math.floor((start + end) / 2);
  if (arr[mid] < target) {
    return binarySearch(start, mid, target, arr);
  } else {
    return binarySearch(mid + 1, end, target, arr);
  }
};
const lowerBound = function (target, arr) {
  return binarySearch(0, arr.length, target, arr);
};
let answer = 0;

console.log(students);

for (let i = 0; i < n; i++) {
  const first = students[i];
  const restArr = students.slice(i + 2, students.length).reverse();
  for (let j = i + 1; j < n - 1; j++) {
    const second = students[j];
    const sum = first + second;
    const negative = -1 * sum;
    const currIndex = lowerBound(negative, restArr);
    const nextIndex = lowerBound(negative + 1, restArr);
    if (currIndex !== nextIndex) {
      console.log(first, second, negative);
      answer += currIndex - nextIndex;
    }
    restArr.pop();
  }
}

console.log(answer);

// 세 용액 문제(하나의 배열 안에서 고르는 문제)와 합이 0인 네 정수 문제(lowerBound)의 혼합
// c++에서는 같은 로직으로 통과, js에서는 시간 초과
// 최적화 필요
