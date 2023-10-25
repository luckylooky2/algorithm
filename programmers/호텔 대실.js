// 호텔 대실 : 브루트 포스
function diff(from, to) {
  return to[0] * 60 + to[1] - (from[0] * 60 + from[1]);
}

function solution(book_time) {
  var answer = 0;
  let min = -Infinity;
  const sorted = book_time
    .map((v) => v.map((v) => v.split(":").map((v) => parseInt(v, 10))))
    .sort((a, b) => {
      if (a[0][0] !== b[0][0]) return a[0][0] - b[0][0];
      else return a[0][1] - b[0][1];
    });
  const valid = sorted.map((v) => false);
  sorted.map((v, i) => {
    answer++;
    for (let j = i; j >= 0; j--) {
      if (valid[j]) continue;
      const res = diff(sorted[j][1], v[0]);
      // 10분 이내에 들어가지 못하는 조건을 빼먹었음
      if (res >= 10) {
        valid[j] = true;
        answer--;
      }
    }
    min = Math.max(min, answer);
  });
  return min;
}
