const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = parseInt(input[0], 10);
const arr = input.map((v) => v.split("")).filter((v, i) => i !== 0);
let final = "";

function check(headX, headY, n) {
  let white = 0,
    black = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[headX + i][headY + j] === "0") white++;
      else if (arr[headX + i][headY + j] === "1") black++;
    }
  }
  if (black === 0) return "0";
  else if (white === 0) return "1";
  else return "2";
}

function divide(n, x = 0, y = 0) {
  let half = n / 2;

  if (n === 2) {
    final += "(";
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++) final += arr[x + i][y + j];
    final += ")";
    return;
  }

  final += "(";
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const headX = x + i * half;
      const headY = y + j * half;
      const res = check(headX, headY, half);

      if (res === "0" || res === "1") final += res;
      else divide(n / 2, headX, headY);
    }
  }
  final += ")";
}

const first = check(0, 0, n);
if (first === "0" || first === "1") final += `${first}`;
else divide(n);

console.log(final);

// 왜 전부 똑같으면 괄호를 출력하면 안 되는가? 이유를 찾자 => 주어진 문제를 똑바로 읽지 않음
// 패착 : 서브젝트를 읽는 것처럼 읽자(괄호의 악몽)
// 주어진 영상이 모두 0으로만 되어 있으면 압축 결과는 "0"이 되고, 모두 1로만 되어 있으면 압축 결과는 "1"이 된다.
// 만약 0과 1이 섞여 있으면 전체를 한 번에 나타내지를 못하고, 왼쪽 위, 오른쪽 위, 왼쪽 아래, 오른쪽 아래, 이렇게 4개의 영상으로 나누어 압축하게 되며, 이 4개의 영역을 압축한 결과를 차례대로 괄호 안에 묶어서 표현한다.

// 그래도 디버깅을 하면서 n이 2일 때 (0000) 출력되는 것을 보고, 모두 같은 숫자를 처음에 한 번 체크하는 로직을 추가

// 약간 백트래킹과도 비슷한 느낌?
