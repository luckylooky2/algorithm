// 차집합 : 정렬, 이분 탐색, 해시를 사용한 집합과 맵
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [] = input.shift();
const sortFunction = (a, b) => a - b;
const setA = input.shift().sort(sortFunction);
const setB = input.shift().sort(sortFunction);

// ver 1.
let indexA = 0;
let indexB = 0;
const answer = [];

while (indexA < setA.length && indexB < setB.length) {
  const currA = setA[indexA];
  const currB = setB[indexB];

  if (currA < currB) {
    answer.push(currA);
    indexA++;
  } else if (currA === currB) {
    // 저장하지 않고 둘 다 넘기기
    indexA++;
    indexB++;
  } else {
    while (indexB < setB.length && currA > setB[++indexB]) {}
  }
}

for (; indexA < setA.length; indexA++) {
  answer.push(setA[indexA]);
}

console.log(answer.length === 0 ? 0 : `${answer.length}\n${answer.join(" ")}`);

// 입력값 출력 실수

// 이분 탐색으로 풀어보기 => 이분 탐색으로 A의 원소가 B에 있는지 확인
// 있다면? 제외, 없다면? 답에 포함

// ver 2.
// const answer = [];

// function binarySearch(start, end, target, set) {
//   if (start === end) {
//     return set[start] === target ? null : set[start];
//   }

//   const mid = Math.floor((start + end) / 2);

//   if (set[mid] < target) {
//     return binarySearch(mid + 1, end, target, set);
//   } else {
//     return binarySearch(start, mid, target, set);
//   }
// }

// for (let i = 0; i < setA.length; i++) {
//   const curr = setA[i];
//   const res = binarySearch(0, setB.length - 1, curr, setB);
//   if (res !== null) {
//     answer.push(curr);
//   }
// }

// console.log(answer.length === 0 ? 0 : `${answer.length}\n${answer.join(" ")}`);
