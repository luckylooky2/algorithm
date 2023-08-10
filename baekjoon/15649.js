// N과 M (1) : 백트래킹
const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v, 10));
let n = input[0];
let r = input[1];
let arr = [];
let result = [];

// 마지막에 추가한 것 이전까지 비교
function checkRepeat(result, number, count) {
  for (let i = 0; i < count; i++) {
    if (result[i] === number) return true;
  }
  return false;
}

function permutation(s = 0, depth = 0) {
  result[depth] = s;

  // 유망성 검사
  if (depth > 1 && checkRepeat(result, s, depth)) return;

  // 해 검사
  if (depth === r) {
    arr.push(result.filter((v, i) => i !== 0).join(" "));
    return;
  }

  // n^r 경우의 수 탐색
  for (let i = 1; i <= n; i++) {
    permutation(i, depth + 1);
  }
}

permutation();

// 출력 시간 차이 떄문에 발생 : 매번 출력 vs. 저장 후 한 번에 출력
console.log(arr.join("\n"));
