// IOIOI : 문자열
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = Number(input.shift());
const m = Number(input.shift());
const str = input.shift();
let continuous = false;
let toBe = "I";
let start = 0,
  end = 0;
const Pn = [];
let answer = 0;

for (let i = 0; i < str.length; i++) {
  const curr = str[i];
  if (curr === "I") {
    // I가 나와야 하는데, I가 나온 경우
    if (toBe === "I") {
      // 시작 지점 설정
      if (!continuous) {
        continuous = true;
        start = i;
      }
      // 끝 지점 계속 업데이트
      end = i;
    }
    // O이 나와야 하는데, I가 나온 경우 (IOII) => 이전 지점까지 저장 후, 다시 시작
    else if (toBe === "O") {
      if (end !== start) {
        Pn.push((end - start) / 2);
      }
      continuous = true;
      start = i;
      end = i;
    }
    toBe = "O";
  } else if (curr === "O") {
    // I가 나와야 하는데, O가 나온 경우 (IOIOO) => 이전 지점까지 저정 후, I가 나오길 기다림
    if (toBe === "I") {
      if (end !== start && continuous) {
        Pn.push((end - start) / 2);
      }
      continuous = false;
    }
    // O가 나와야 하는데, O가 나온 경우 => 생략
    toBe = "I";
  }

  // 마지막으로 추가
  if (i === str.length - 1) {
    if (end !== start) {
      Pn.push((end - start) / 2);
    }
  }
}

for (let length of Pn) {
  answer += Math.max(0, length - n + 1);
}

console.log(answer);

// 구조적으로 경우의 수를 나누고, pseudo code로 적으면서 하는 것이 훨씬 더 빠르게 풀 수 있다
