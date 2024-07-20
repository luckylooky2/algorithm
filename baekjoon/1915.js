// 가장 큰 정사각형 : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [row, col] = input
  .shift()
  .split(" ")
  .map((v) => Number(v));
const map = input.map((v) => v.split("").map((v) => Number(v)));
const dptable = map.map((v) => v.slice().fill(0));
let answer = 0;

for (let i = 0; i < col; i++) {
  if (map[0][i]) {
    dptable[0][i] = 1;
    answer = 1;
  }
}

for (let i = 0; i < row; i++) {
  if (map[i][0]) {
    dptable[i][0] = 1;
    answer = 1;
  }
}

for (let i = 1; i < row; i++) {
  for (let j = 1; j < col; j++) {
    if (map[i][j]) {
      const up = dptable[i - 1][j];
      const left = dptable[i][j - 1];
      const upleft = dptable[i - 1][j - 1];

      dptable[i][j] = Math.min(up, left, upleft) + 1;
      answer = Math.max(answer, dptable[i][j]);
    }
  }
}

console.log(answer * answer);

// 4 4
// 0100
// 0111
// 1110
// 0010

// Try 1
// - 브루트 포스 => 시간 초과
// - 브루트 포스 기반으로 maxLen을 얼마나 답과 가까이 구할 수 있는가가 속도를 빠르게 하는 유일한 방법인 듯
// - 1) 행, 열별 연속으로 나오는 최대 개수를 저장하는 1차원 배열. e.g. [1, 3, 3, 1], [1, 3, 3, 1]
// - 정사각형을 만들기 위해 필요한 조건처럼은 보이지 않는다
// - 2) 누적합 2차원 배열
// - 아직 시도하지 않았다
// - Math.min(maxRow, maxCol, Math.floor(Math.sqrt(countOne)))

// Try 2
// - 동적 계획법
// - dptable[i][j] : i행 j열에서 가장 큰 정사각형의 변의 길이
// - 현재 위치에서 가장 긴 길이를 구하기 위해서는, 현재 지점을 오른쪽 아래 끝으로 하는 정사각형 내의 모든 값을 확인해야 한다
// - 하지만 당연히 시간 초과가 발생한다
// - dptable을 이용하여 up, left, upleft 세 군데만 확인하면 된다
// - dptable에서 특정 값은 그 이전의 이미 센 정사각형의 값을 저장하는 효과가 있다

// 4 4
// 1111
// 1111
// 1101
// 1111

// dptable
// 1111
// 1222
// 1201
// 1211

// BSQ : 어렵게 생각하면 어렵고, 쉽게 생각하면 쉬운 문제
