// 숫자 카드 2 : 이분 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const arr = input.shift();
const [m] = input.shift();
const test = input.shift();
const answer = [];

// merge sort, binary search ver.
function sort(leftArr, rightArr) {
  let i = 0,
    j = 0;
  const sorted = [];

  while (i !== leftArr.length || j !== rightArr.length) {
    // else if 조심
    if (i === leftArr.length || leftArr[i] > rightArr[j])
      sorted.push(rightArr[j++]);
    else if (j === rightArr.length || leftArr[i] <= rightArr[j])
      sorted.push(leftArr[i++]);
  }

  return sorted;
}

function merge(left, mid, right) {
  if (left === right) return [arr[left]];

  const leftHalf = Math.floor((left + mid) / 2);
  const rightHalf = Math.floor((mid + 1 + right) / 2);
  const leftArr = merge(left, leftHalf, mid);
  const rightArr = merge(mid + 1, rightHalf, right);
  return sort(leftArr, rightArr);
}

// mid 값에 - 1 주의
const sorted = merge(0, Math.floor((arr.length - 1) / 2), arr.length - 1);

// lowerbound, upperbound 구현해보기
let i = 0,
  j = 0;
const result = [[], []];
let prev = Infinity;
while (i !== sorted.length) {
  if (sorted[i] !== prev) {
    result[0][j] = sorted[i];
    result[1][j] = 1;
    j++;
  } else result[1][j - 1]++;
  prev = sorted[i];
  i++;
}

function bs(target, left, mid, right) {
  if (left === right)
    return answer.push(target === result[0][left] ? result[1][left] : 0);

  const leftHalf = Math.floor((left + mid) / 2);
  const rightHalf = Math.floor((mid + 1 + right) / 2);
  // 등호 주의 : mid 인덱스는 이 쪽에 포함되기 때문에 등호가 있어야 함
  if (target <= result[0][mid]) bs(target, left, leftHalf, mid);
  else bs(target, mid + 1, rightHalf, right);
}

test.forEach((elem) => {
  // mid 값에 - 1 주의
  bs(elem, 0, Math.floor((result[0].length - 1) / 2), result[0].length - 1);
});

console.log(answer.join(" "));

// hash map ver. : 짧은데 시간은 더 걸림
// const hashMap = {};

// sorted.forEach((elem) => {
//   if (hashMap[elem]) hashMap[elem]++;
//   else hashMap[elem] = 1;
// });

// test.forEach((elem) => {
//   answer.push(hashMap[elem] ? hashMap[elem] : 0);
// });

// console.log(answer.join(" "));
