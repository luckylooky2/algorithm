// Z : 분할 정복
const fs = require("fs");
const [k, row, column] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v, 10));

const n = Math.pow(2, k);

// 메모리 초과 : 메모리를 사용하지 말라
// const arr = [];
// for (let i = 0; i < n; i++) arr.push(Array(n).fill(0));

let visit = 0;

function traverse(n, x = 0, y = 0) {
  const half = n / 2;

  if (n === 2) {
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++) {
        if (x + i === row && y + j === column) console.log(visit);
        visit++;
      }
    return;
  }

  // 이 경우 식을 찾는 것은 더 어려울 수 있음
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const headX = x + half * i;
      const headY = y + half * j;
      // 시간 초과 : 필요없는 재귀 호출은 하지 않고 개수만 더함
      if (
        headX <= row &&
        row < headX + half &&
        headY <= column &&
        column < headY + half
      )
        traverse(half, headX, headY);
      else visit += half * half;
    }
  }
}

traverse(n);
