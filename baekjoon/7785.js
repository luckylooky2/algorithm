// 회사에 있는 사람 : 해시를 사용한 집합과 맵
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const [n] = arr.shift();

// 해시 ver.
const log = {};

for (let [name, event] of arr) {
  if (event === "enter") log[name] = true;
  else log[name] = false;
}

// string 정렬은 콜백 함수가 필요하지 않음
console.log(
  Object.entries(log)
    .filter(([key, value]) => value === true)
    .map((v) => v[0])
    .sort()
    .reverse()
    .join("\n")
);

// 이분 탐색

// 이분 탐색 함수를 구현할 때, 구분을 대소 비교에 따른 인덱스 포함 조건을
// 2가지가 아닌 3가지 경우의 수로 생각하는 것이 중복이 발생하더라도 직관적

// function binarySearch(name, list) {
//   let s = 0,
//     e = list.length - 1,
//     mid;

//   while (s <= e) {
//     mid = Math.floor((s + e) / 2);
//     if (list[mid][0] < name) s = mid + 1;
//     else if (list[mid][0] > name) e = mid - 1;
//     else return mid;
//   }
//   return -1;
// }

// let log = [];
// for (let [name, event] of arr) {
//   const index = binarySearch(name, log);
//   if (index !== -1) {
//     if (event === "leave") log[index][1] = false;
//     else if (event === "enter") log[index][1] = true;
//   } else {
//     log.push([name, true]);
//     log.sort(); // 시간 초과
//   }
// }

// sort를 n번 하게 되면, 최소 O(n)*O(nlogn)이기 때문에 시간 초과가 발생
// 따라서 하나하나 처리하고 정렬하는 것이 아니라, 한 번에 다 받아놓고 정렬을 마지막에 한 번만 하는 방법으로 해야 시간 초과가 발생하지 않음
// 하지만 이 방법은 그때그때 상황을 알 수가 없다는 단점이 존재(실시간 반영 x)
// 실시간 반영이 되게 하려면 추가/삭제/검색이 최소 O(logn) 이하인 맵이나 해시 테이블을 사용해야 함

// console.log(
//   log
//     .filter(([key, value]) => value === true)
//     .map((v) => v[0])
//     .sort()
//     .reverse()
//     .join("\n")
// );
