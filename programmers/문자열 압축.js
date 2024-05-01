// 문자열 압축 : 브루트 포스
function solution(s) {
  const n = s.length;
  let answer = n;
  const max = Math.floor(s.length / 2);
  for (let i = 1; i <= max; i++) {
    const candidates = [];
    for (let j = 0; j < n; j += i) {
      candidates.push(s.slice(j, j + i));
    }
    let k = 0;
    let count = 0;
    let prev;
    let res = [];
    while (k < candidates.length) {
      // 연속된 개수를 확인 : prev, count
      const curr = candidates[k];
      if (prev !== curr) {
        if (count) {
          res.push(count + 1);
        }
        prev = curr;
        count = 0;
      } else {
        count++;
      }
      k++;
    }
    if (count) {
      res.push(count + 1);
    }
    const total = res.reduce((acc, curr) => acc + String(curr).length + i, 0);
    const rest = n - res.reduce((acc, curr) => acc + curr * i, 0);
    answer = Math.min(answer, total + rest);
  }
  return answer;
}

// 처음부터 일정한 크기로 잘라야 한다는 문구를 구현한 후 발견하였다
