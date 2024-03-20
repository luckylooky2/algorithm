// 테이블 해시 함수 : 구현
function solution(data, col, row_begin, row_end) {
  // 1. 테이블 정렬
  const sorted = data.sort((a, b) => {
    if (a[col - 1] !== b[col - 1]) {
      return a[col - 1] - b[col - 1];
    } else {
      return b[0] - a[0];
    }
  });
  // 2. s_i 배열
  const s_i = [];
  for (let i = row_begin; i <= row_end; i++) {
    const tuple = data[i - 1];
    let result = 0;
    for (let j = 0; j < tuple.length; j++) {
      result += tuple[j] % i;
    }
    s_i.push(result);
  }
  // 3. 해시 값
  var answer = s_i[0];
  for (let i = 1; i < s_i.length; i++) {
    answer = answer ^ s_i[i];
  }
  return answer;
}

// 20'53" / 60'00"
