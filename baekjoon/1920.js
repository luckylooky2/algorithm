// 수 찾기 : 합병 정렬, 이분 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));

const [n] = input.shift();
const beforeSort = input.shift();
const [m] = input.shift();
const arr = input.shift();
const answer = [];

function sort(la, ra) {
  const arr = [];
  let i = 0,
    j = 0;

  while (i !== la.length || j !== ra.length) {
    let left = i === la.length ? Infinity : la[i];
    let right = j === ra.length ? Infinity : ra[j];
    if (left > right) arr.push(ra[j++]);
    else arr.push(la[i++]);
  }
  return arr;
}

function merge(arr, left, mid, right) {
  if (left === right) return [arr[left]];

  const la = merge(arr, left, Math.floor((left + mid) / 2), mid);
  const ra = merge(arr, mid + 1, Math.floor((mid + right) / 2), right);
  return sort(la, ra);
}

const afterSort = merge(beforeSort, 0, Math.floor((n - 1) / 2), n - 1);

function bs(target, left, mid, right) {
  if (left === right) return answer.push(afterSort[left] === target ? 1 : 0);

  if (afterSort[mid] >= target)
    bs(target, left, Math.floor((left + mid) / 2), mid);
  else bs(target, mid + 1, Math.floor((mid + right) / 2), right);
}

arr.forEach((element) => {
  bs(element, 0, Math.floor(n / 2), n);
});

console.log(answer.join("\n"));
