// 주사위 윷놀이 : 구현, 시뮬레이션, 백트래킹, 브루트 포스
const dices = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split(" ")
  .map((v) => +v);
let answer = 0;

// 현재 노드: [[연결된 map의 인덱스], 점수]
const map = [
  [[1], 2],
  [[2], 4],
  [[3], 6],
  [[4], 8],
  [[5, 20], 10], // 4
  [[6], 12],
  [[7], 14],
  [[8], 16],
  [[9], 18],
  [[10, 23], 20], // 9
  [[11], 22],
  [[12], 24],
  [[13], 26],
  [[14], 28],
  [[15, 25], 30], // 14
  [[16], 32],
  [[17], 34],
  [[18], 36],
  [[19], 38],
  [[null], 40], // 19
  [[21], 13],
  [[22], 16],
  [[28], 19],
  [[24], 22],
  [[28], 24],
  [[26], 28],
  [[27], 27],
  [[28], 26],
  [[29], 25],
  [[30], 30],
  [[19], 35],
];
const horses = [0, -1, -1, -1, -1];

function forward(map, horses, index, count) {
  for (let i = 0; i < count; i++) {
    if (horses[index] === -1) {
      horses[index] = 0;
    } else {
      const [next, _score] = map[horses[index]];
      // 지나가는 것이면 0번 인덱스, 현재 시작하는 것이면 1번 인덱스를 참조
      horses[index] = next[next.length > 1 && i === 0 ? 1 : 0];
      if (horses[index] === null) {
        return false;
      }
    }
  }
  return true;
}

function check(horses) {
  const map = {};

  for (let i = 1; i <= 4; i++) {
    const horse = horses[i];
    if (map[horse] && horse !== -1 && horse !== null) {
      return false;
    } else {
      map[horse] = true;
    }
  }
  return true;
}

(function recur(visit = [], sum = 0) {
  if (visit.length === 10) {
    answer = Math.max(answer, sum);
    return;
  }
  for (let i = 1; i <= 4; i++) {
    // 도착했으면 스킵
    if (horses[i] === null) {
      continue;
    }
    const prev = horses[i];
    // 일단 가본다
    visit.push(i);
    forward(map, horses, i, dices[visit.length - 1]);
    // 이미 있으면 취소
    if (!check(horses)) {
      horses[i] = prev;
      visit.pop();
      continue;
    }
    // 도착인지? 도착이 아닌지?
    if (horses[i] === null) {
      recur(visit, sum);
    } else {
      const [_next, score] = map[horses[i]];
      recur(visit, sum + score);
    }
    // 원상 복구
    horses[i] = prev;
    visit.pop();
  }
})();

console.log(answer);

// 맵을 어떻게 구현할 것인가가 중요할 듯
// - 어떤 자료구조? 배열
// - 나뉜 길에 따라 어떤 길을 선택? 배열에 다음 전진할 칸을 기록하는데, 지나가는 경우와 시작하는 경우를 인덱스를 다르게 두었다.
// - 때로는 맵이 복잡하면 그냥 하드코딩할 때가 빠르고 더 직관적일 때가 많다. 요소가 100개가 넘어가지 않는 한, 하드코딩도 생각해보자
