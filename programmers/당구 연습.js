// 당구 연습 : 브루트 포스, 구현
function calc(a, b, dir, n, m) {
  let c1, c2, first, second;
  switch (dir) {
    case 0:
      c1 = a[0] > b[0] ? a : b;
      c2 = a[0] > b[0] ? b : a;
      first = Math.sqrt(
        Math.pow(n - c1[1], 2) +
          Math.pow((c1[0] - c2[0]) * ((n - c1[1]) / (n - c1[1] + n - c2[1])), 2)
      );
      second = Math.sqrt(
        Math.pow(n - c2[1], 2) +
          Math.pow((c1[0] - c2[0]) * ((n - c2[1]) / (n - c1[1] + n - c2[1])), 2)
      );
      return Math.round(Math.pow(first + second, 2));
    case 1:
      c1 = a[1] > b[1] ? a : b;
      c2 = a[1] > b[1] ? b : a;
      first = Math.sqrt(
        Math.pow(m - c1[0], 2) +
          // cf> 괄호 누락 틀림
          Math.pow((c1[1] - c2[1]) * ((m - c1[0]) / (m - c1[0] + m - c2[0])), 2)
      );
      second = Math.sqrt(
        Math.pow(m - c2[0], 2) +
          Math.pow((c1[1] - c2[1]) * ((m - c2[0]) / (m - c1[0] + m - c2[0])), 2)
      );
      return Math.round(Math.pow(first + second, 2));
    case 2:
      c1 = a[0] > b[0] ? a : b;
      c2 = a[0] > b[0] ? b : a;
      first = Math.sqrt(
        Math.pow(c1[1], 2) +
          Math.pow((c1[0] - c2[0]) * (c1[1] / (c1[1] + c2[1])), 2)
      );
      second = Math.sqrt(
        Math.pow(c2[1], 2) +
          Math.pow((c1[0] - c2[0]) * (c2[1] / (c1[1] + c2[1])), 2)
      );
      return Math.round(Math.pow(first + second, 2));
    case 3:
      c1 = a[1] > b[1] ? a : b;
      c2 = a[1] > b[1] ? b : a;
      first = Math.sqrt(
        Math.pow(c1[0], 2) +
          Math.pow((c1[1] - c2[1]) * (c1[0] / (c1[0] + c2[0])), 2)
      );
      second = Math.sqrt(
        Math.pow(c2[0], 2) +
          Math.pow((c1[1] - c2[1]) * (c2[0] / (c1[0] + c2[0])), 2)
      );
      return Math.round(Math.pow(first + second, 2));
  }
}

function solution(m, n, startX, startY, balls) {
  var answer = [];
  balls.map((v) => {
    let min = Infinity;
    for (let i = 0; i < 4; i++) {
      // cf> 괄호 방향 틀림
      if (startX === v[0] && startY < v[1] && i === 0) continue;
      if (startY === v[1] && startX < v[0] && i === 1) continue;
      if (startX === v[0] && startY > v[1] && i === 2) continue;
      if (startY === v[1] && startX > v[0] && i === 3) continue;
      const res = calc([startX, startY], v, i, n, m);
      min = Math.min(res, min);
    }
    answer.push(min);
  });
  return answer;
}
