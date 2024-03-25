// 교점에 별 만들기 : 구현, 브루트 포스
function solution(line) {
  let [top, right, bottom, left] = [-Infinity, -Infinity, Infinity, Infinity];
  const stars = [];
  for (let i = 0; i < line.length - 1; i++) {
    const [a1, b1, c1] = line[i];
    for (let j = i + 1; j < line.length; j++) {
      const [a2, b2, c2] = line[j];
      if (a1 * b2 !== b1 * a2) {
        let x = (b1 * c2 - c1 * b2) / (a1 * b2 - b1 * a2);
        let y = (c1 * a2 - a1 * c2) / (a1 * b2 - b1 * a2);
        if (x % 1 === 0 && y % 1 === 0) {
          stars.push([x, y]);
          top = Math.max(top, y);
          right = Math.max(right, x);
          bottom = Math.min(bottom, y);
          left = Math.min(left, x);
        }
      }
    }
  }
  const map = new Array(top - bottom + 1)
    .fill(null)
    .map(() => new Array(right - left + 1).fill("."));
  for (const [x, y] of stars) {
    map[top - y][x - left] = "*";
  }
  const answer = map.map((v) => v.join(""));
  return answer;
}

// 105'19" / 60'00"

// 접근 1: 좌표를 기준으로 브루트 포스
// - 정답은 1,000 * 1,000 크기 이내에서 표현됩니다
// - 문구를 잘못 이해 => [-500 ~ 500, -500 ~ 500]로 이해
// - 실패 및 시간 초과 발생(why?)

// 접근 2: line을 기준으로 브루트 포스
// - 다 풀어놓고, 좌표 변환에서 시간 매우 소요
// - [top, bottom, left, right] = [5, -3, -5, 3] 일 때, 기준이 되는 좌표 설정
// - 9 * 9 크기에서 [-5, 5]가 [0, 0]이 되어야 함 => [x - left, top - y]
// - javascript 2차원 array를 순회하는 기준: 위(0)에서 아래(n), 왼쪽(0)에서 오른쪽(n)
// - 1) 따라서 좌표 변환의 기준은 top, left가 되어야 함
// - 2) 결과의 y축은 아래쪽이 0인데, map의 y축은 위쪽이 0이므로 y - top이 아니라 top - y가 되어야 함
