// 두 용액 : 정렬, 이분 탐색, 투 포인터
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const arr = input.shift();
const sortedArr = arr.sort((a, b) => a - b);
let answer = [Infinity, [-Infinity, Infinity]];

function lowerBound(arr, target, start = 0, end = arr.length - 1) {
  const mid = Math.floor((start + end) / 2);

  if (start === end) {
    return start;
  }

  if (arr[mid] < target) {
    return lowerBound(arr, target, mid + 1, end);
  } else {
    return lowerBound(arr, target, start, mid);
  }
}

const max = n - 1;
for (let i = 0; i < sortedArr.length; i++) {
  const elem = sortedArr[i];
  // arr에서 자신은 빼야 함
  const index = lowerBound(arr, -1 * elem);
  // curr
  if (index !== i) {
    const sum = elem + arr[index];
    if (Math.abs(answer[0]) > Math.abs(sum)) {
      answer = [Math.abs(sum), [elem, arr[index]]];
    }
  }
  // prev
  if (index !== 0 && index - 1 !== i) {
    const sum = elem + arr[index - 1];
    if (Math.abs(answer[0]) > Math.abs(sum)) {
      answer = [Math.abs(sum), [elem, arr[index - 1]]];
    }
  }
  // next
  if (index !== max && index + 1 !== i) {
    const sum = elem + arr[index + 1];
    if (Math.abs(answer[0]) > Math.abs(sum)) {
      answer = [Math.abs(sum), [elem, arr[index + 1]]];
    }
  }
}

console.log(answer[1].sort((a, b) => a - b).join(" "));
