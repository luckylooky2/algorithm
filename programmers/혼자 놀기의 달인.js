// 혼자 놀기의 달인 : 구현
function solution(cards) {
  const candidates = {};
  let key = -1;
  for (let i = 0; i < cards.length; i++) {
    let curr = cards[i] - 1;
    let prev = i;
    let count = 0;
    if (curr < 0) {
      continue;
    }
    while (curr >= 0) {
      cards[prev] = key;
      prev = curr;
      curr = cards[curr] - 1;
      count++;
    }
    candidates[key] = count;
    key--;
  }
  const sorted = Object.entries(candidates).sort((a, b) => b[1] - a[1]);
  const first = sorted[0][1];
  const second = sorted[1] === undefined ? 0 : sorted[1][1];
  return first * second;
}

// 중복되는 원소가 존재하지 않기 때문에 반드시 사이클이 존재 => 최소 스패닝 트리(union find)를 사용하지 않아도 됨
