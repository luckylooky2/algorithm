// 점 찍기 : 구현
function solution(k, d) {
  var answer = 0;
  for (let y = 0; y <= d; y += k) {
    const x = Math.sqrt(Math.pow(d, 2) - Math.pow(y, 2));
    const xCount = Math.floor(Math.floor(x) / k) + 1;
    answer += xCount;
  }
  return answer;
}

// 11'10" / 60'00"
// 두 원 사이의 정수 쌍 문제의 하위 호환 : 한 사분면의 값만 구하면 되고, 두 원 사이의 공통점을 구할 필요도 없음
