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

// 이분 탐색으로 풀어보기
