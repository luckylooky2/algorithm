// 두 배열의 합 : 이분 탐색, 정렬, 누적 합
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [t] = input.shift();
const [n] = input.shift();
const arrA = input.shift();
const [m] = input.shift();
const arrB = input.shift();
const sortFunction = (a, b) => a - b;
const binarySearch = function (start, end, target, arr) {
  if (start === end) {
    return start;
  }
  const mid = Math.floor((start + end) / 2);
  if (arr[mid] < target) {
    return binarySearch(mid + 1, end, target, arr);
  } else {
    return binarySearch(start, mid, target, arr);
  }
};
const lowerBound = function (target, arr) {
  return binarySearch(0, arr.length, target, arr);
};
const makeSubArray = function (arr) {
  const subArray = [];
  for (let length = 1; length <= arr.length; length++) {
    let total = 0;
    let first = 0;
    let second = length;
    for (let i = 0; i < length; i++) {
      total += arr[i];
    }
    while (second <= arr.length) {
      subArray.push(total);
      total -= arr[first++];
      total += arr[second++];
    }
  }
  return subArray.sort(sortFunction);
};
let answer = 0;
const subArrayA = makeSubArray(arrA);
const subArrayB = makeSubArray(arrB);

for (let elem of subArrayA) {
  const diff = t - elem;
  const lb = lowerBound(diff, subArrayB);
  const ub = lowerBound(diff + 1, subArrayB);
  answer += ub - lb;
}

console.log(answer);
