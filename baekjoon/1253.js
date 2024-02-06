// 좋다 : 정렬, 이분 탐색, 투 포인터
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const sortFunction = (a, b) => a - b;
const arr = input.shift().slice().sort(sortFunction);
const isGoodNum = {};
const numCount = {};
let answer = 0;
const descendingBinarySearch = function (start, end, target, arr) {
  if (start === end) {
    return arr[start] === target ? true : false;
  }

  const mid = Math.floor((start + end) / 2);
  if (target < arr[mid]) {
    return descendingBinarySearch(mid + 1, end, target, arr);
  } else {
    return descendingBinarySearch(start, mid, target, arr);
  }
};

for (let number of arr) {
  if (!numCount[number]) {
    numCount[number] = 1;
  } else {
    numCount[number]++;
  }
}

for (let i = 0; i < n; i++) {
  const first = arr[i];
  const sliced = arr.slice(i + 2, arr.length).reverse();
  for (let j = i + 1; j < n + 1; j++) {
    const second = arr[j];
    const candidates = [
      [first - second, first],
      [second - first, second],
      [first + second, first + second],
    ];
    // 반복문을 사용하는 것보다 if문을 연속 3번 쓰는 것이 50% 시간 단축
    // why?
    for (let [target, index] of candidates) {
      // 이분 탐색을 먼저 하는 것이 해시 테이블에서 true인지 먼저 찾는 것보다 성능이 더 좋음
      if (
        descendingBinarySearch(0, sliced.length, target, sliced) &&
        !isGoodNum[index]
      ) {
        isGoodNum[index] = true;
        answer += numCount[index];
      }
    }
    sliced.pop();
  }
}

console.log(answer);

// 세 용액 문제와 비슷하지만, 조건이 다른 문제
// 1. 이 문제는 경우가 겹치는 것을 제외해야 하기 때문에, isGoodNum이라는 객체를 이용하여 t/f 저장
// 2. 숫자가 중복된만큼 answer에 더해주어야 하기 때문에, numCount라는 객체를 이용하여 개수 저장
// 3. 중복된 숫자만큼 무엇을 하는 것은 아니기 때문에 굳이 lowerBound는 구현하지 않음
