// 배열 합치기 : 정렬, 투 포인터
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, m] = arr.shift();
const arr1 = arr[0],
  arr2 = arr[1];
const answer = [];
let i = 0,
  j = 0;

while (i !== n || j !== m) {
  if (j === m || arr1[i] < arr2[j]) answer.push(arr1[i++]);
  else answer.push(arr2[j++]);
}

console.log(answer.join(" "));
