// 연산자 끼워넣기 : 백트래킹, 브루트 포스

// 최적화 이후 ver.
const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10))); // [2, [5, 6], [0, 0, 1, 0]]

const numbers = input[1];
const ops = "+-*/";
const ops2 = {
  "+": 0,
  "-": 1,
  "*": 2,
  "/": 3,
};
const final = [];
const result = [];
const n = input[2].reduce((a, b) => a + b);

function checkCount(result, depth, next) {
  const check = [0, 0, 0, 0];
  for (let i = 0; i < depth; i++) {
    check[ops2[result[i]]]++;
  }
  check[ops2[next]]++;
  for (let i = 0; i < 4; i++) {
    if (check[i] > input[2][i]) return true;
  }
  return false;
}

function calc(ops) {
  let res = numbers[0];

  for (let i = 0; i < numbers.length - 1; i++) {
    switch (ops[i]) {
      case "+":
        res += numbers[i + 1];
        break;
      case "-":
        res -= numbers[i + 1];
        break;
      case "*":
        res *= numbers[i + 1];
        break;
      case "/":
        if (res < 0) res = -1 * Math.floor((res * -1) / numbers[i + 1]);
        else res = Math.floor(res / numbers[i + 1]);
        break;
    }
  }
  return res;
}

function operator(depth = 0) {
  // 3. 해 검사
  if (depth === n) {
    final.push(calc(result));
    return;
  }

  for (let i = 1; i <= 4; i++) {
    // 2. 유망성 검사 : 다음 상태의 유망성을 기준으로
    if (checkCount(result, depth, ops[i - 1])) continue;
    // 1. 초기 상태 설정
    result.push(ops[i - 1]);
    // 4. 재귀 호출
    operator(i, depth + 1);
    // 5. 상태 복원
    result.pop();
  }
}

operator();
final.sort((a, b) => a - b);
console.log([final[final.length - 1], final[0]].join("\n"));
