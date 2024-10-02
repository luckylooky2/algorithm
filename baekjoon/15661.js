// 링크와 스타트 : 조합, 브루트 포스, 비트마스킹, 백트래킹
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const map = input;
let answer = Infinity;
const [ROW, COLUMN] = [0, 1];
const sums = new Array(2).fill(null).map(() => new Array(n).fill(0));

for (let i = 0; i < map.length; i++) {
  sums[ROW][i] = map[i].reduce((acc, curr) => acc + curr, 0);
}

for (let i = 0; i < map[0].length; i++) {
  for (let j = 0; j < map.length; j++) {
    sums[COLUMN][i] += map[j][i];
  }
}

function makeT2(t1, max) {
  let t2 = 0;

  for (let i = 0, j = 0; i < max; i++) {
    const bit = 1 << i;
    if ((t1 | bit) === t1) {
      j++;
    } else {
      t2 |= bit;
    }
  }

  return t2;
}

function calc(map, t1, t2) {
  // ver.1
  //   let [sum1, sum2] = [0, 0];
  //   for (let i = 0; i < map.length; i++) {
  //     for (let j = 0; j < map[0].length; j++) {
  //       const [bitI, bitJ] = [1 << i, 1 << j];
  //       if ((t1 | bitI) === t1 && (t1 | bitJ) === t1) {
  //         sum1 += map[i][j];
  //       } else if ((t2 | bitI) === t2 && (t2 | bitJ) === t2) {
  //         sum2 += map[i][j];
  //       }
  //     }
  //   }

  //   return Math.abs(sum1 - sum2);

  // ver.2
  let diff = 0;
  for (let i = 0; i < map.length; i++) {
    if ((t1 | (1 << i)) === t1) {
      diff += sums[ROW][i];
    } else {
      diff -= sums[COLUMN][i];
    }
  }
  return Math.abs(diff);
}

function combination(map, target, max, depth = 0, visit = 0, curr = 0) {
  if (depth === target) {
    const t1 = visit;
    const t2 = makeT2(t1, max);
    answer = Math.min(answer, calc(map, t1, t2));
    return;
  }

  // 비트마스킹을 사용하면 visit.length처럼 접근할 수 없기 때문에 depth를 두어야 할 듯?
  for (let i = curr; i < max; i++) {
    if ((visit | (1 << i)) === visit) {
      continue;
    }
    visit |= 1 << i;
    combination(map, target, max, depth + 1, visit, i);
    // XOR
    visit ^= 1 << i;
  }
}

for (let i = 1; i <= Math.floor(n / 2); i++) {
  combination(map, i, n);
}

console.log(answer);

// Try 1
// nC1 ~ nC(Math.floor(n / 2))까지 모든 경우의 수
// - 최대: 1048555(20C1 ~ 20C20), 616665(20C1 ~ 20C10) => 브루트 포스 가능
// - 비트마스킹을 이용하여 Array.includes 시간을 절약

// 두 팀의 차이를 구하는 방법
// - 1. map을 모두 순회하며 row, col이 모두 한 팀에 속하는지 확인 => O(n^2)
// - 2. t1에 있는 사람은 row의 합, t2에 있는 사람은 column의 합을 각각 팀 단위로 더한 뒤 뺀 차이 => O(n)

// t1 (0, 1), t2 (2, 3)일 때,

//  (S)  (A)
// 0 0 | 0 0
// 0 0 | 0 0
// ㅡㅡㅡㅡㅡㅡ
// 0 0 | 0 0
// 0 0 | 0 0
// (B)   (L)

// - 왼쪽 위부터 시계 방향으로 구역을 S, A, L, B라고 하자
// - 구하고자 하는 값: S - L
// - map 전체의 합: S + L + A + B
// - t1 (0, 1)의 row 합: S + A
// - t2 (2, 3)의 column 합: A + L
// - t1의 row 합 - t2의 column 합 = S + A - A - L = S - L (구하고자 하는 값)
