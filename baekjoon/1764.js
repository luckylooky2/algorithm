// 듣보잡 : 정렬, 이분 탐색, 문자열, 해시를 사용한 집합과 맵
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const [n, m] = input.shift().map((v) => parseInt(v, 10));
const first = input.flat().splice(0, n);
const second = input.flat().splice(n, input.length - 1);
const answer = [];

function strcmp(str1, str2) {
  let i = 0;
  const long = str1.length > str2.length ? str1.length : str2.length;
  while (i != long) {
    if (!str2[i] || str1[i] > str2[i]) return 1;
    else if (!str1[i] || str1[i] < str2[i]) return -1;
    i++;
  }
  return 0;
}

function sort(leftArr, rightArr) {
  let i = 0,
    j = 0;
  const sorted = [];
  while (!(i === leftArr.length && j === rightArr.length)) {
    if (j === rightArr.length) sorted.push(leftArr[i++]);
    else if (i === leftArr.length) sorted.push(rightArr[j++]);
    else if (strcmp(leftArr[i], rightArr[j]) > 0) sorted.push(rightArr[j++]);
    else sorted.push(leftArr[i++]);
  }
  return sorted;
}

function merge(arr, left, mid, right) {
  if (left === right) return [arr[left]];
  const leftMid = Math.floor((left + mid) / 2);
  const rightMid = Math.floor((mid + 1 + right) / 2);
  const leftArr = merge(arr, left, leftMid, mid);
  const rightArr = merge(arr, mid + 1, rightMid, right);
  return sort(leftArr, rightArr);
}

function bs(arr, target, left, mid, right) {
  if (left === right) {
    if (strcmp(target, arr[left]) === 0) answer.push(arr[left]);
    return;
  }

  const leftMid = Math.floor((left + mid) / 2);
  const rightMid = Math.floor((mid + 1 + right) / 2);
  if (strcmp(target, arr[mid]) < 0) {
    return bs(arr, target, left, leftMid, mid);
  } else if (strcmp(target, arr[mid]) > 0)
    return bs(arr, target, mid + 1, rightMid, right);
  else return answer.push(arr[mid]);
}

const sortedFirst = merge(
  first,
  0,
  Math.floor((first.length - 1) / 2),
  first.length - 1
);
const sortedSecond = merge(
  second,
  0,
  Math.floor((second.length - 1) / 2),
  second.length - 1
);

const findTo =
  sortedFirst.length < sortedSecond.length ? sortedFirst : sortedSecond;
const findFrom =
  sortedFirst.length < sortedSecond.length ? sortedSecond : sortedFirst;

findTo.map((v) => {
  bs(
    findFrom,
    v,
    0,
    Math.floor((findFrom.length - 1) / 2),
    findFrom.length - 1
  );
});

console.log(answer.length);
console.log(answer.join("\n"));
