// 예산 : 이분 탐색, 매개변수 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [] = input.shift();
const requests = input.shift().sort((a, b) => a - b);
const [limit] = input.shift();
let answer = 0;

function check(requests, target) {
  let total = 0;
  for (let i = 0; i < requests.length; i++) {
    const curr = requests[i];
    const res = target > curr ? curr : target;
    total += res;
  }
  return total;
}

function binarySearch(start, end, requests) {
  const mid = Math.floor((start + end) / 2);
  // 체크 함수
  const res = check(requests, mid);
  // 예산보다 현재는 작더라도 큰 것을 한 번 확인해봐야 하기 때문에 일단 재귀 호출을 하고
  // 해당 케이스에서 조건에 맞지 않으면 answer을 최신화하지 않는 방법으로 "순서를 바꿈"
  // 원래는 answer을 함수 맨 위에서 최신화하는 코드였음
  if (res <= limit) {
    answer = Math.max(mid, answer);
  }
  if (start === end) {
    return;
  }
  if (res > limit) {
    return binarySearch(start, mid, requests);
  } else {
    return binarySearch(mid + 1, end, requests);
  }
}

const requestTotal = requests.reduce((prev, next) => prev + next);
if (requestTotal > limit) {
  binarySearch(0, limit, requests);
  console.log(answer);
} else {
  console.log(requests[requests.length - 1]);
}
