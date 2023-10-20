// 요격 시스템 : 정렬, 그리디
function solution(targets) {
  var answer = 0;
  const sorted = targets.sort((a, b) => a[0] - b[0]);
  let left = Infinity;
  let right = -Infinity;
  console.log(sorted);
  targets.map((v) => {
    // 포함
    if (v[0] < left && right > v[1] - 1) {
      left = v[0];
      right = v[1] - 1;
    }
    // 포함되지 않음
    else if (v[0] > right || v[1] - 1 < left) {
      left = v[0];
      right = v[1] - 1;
      answer++;
    }
    // 걸침
    else {
      left = Math.max(left, v[0]);
      right = Math.min(right, v[1] - 1);
    }
  });
  return answer;
}
