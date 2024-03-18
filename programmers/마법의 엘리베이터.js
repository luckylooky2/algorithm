// 마법의 엘리베이터 : 그리디
function solution(storey) {
  var answer = 0;

  while (storey) {
    let remainder = storey % 10;
    if (remainder > 5) {
      answer += 10 - remainder;
      storey += 10;
    } else if (remainder < 5) {
      answer += remainder;
    } else {
      if (Math.floor(storey / 10) % 10 > 4) {
        storey += 10;
      }
      answer += remainder;
    }
    storey = Math.floor(storey / 10);
  }
  return answer;
}

// 시도 1 : 현재 층이 나눌 수의 절반보다 큰 지를 기준으로 나눔
// - 나눌 수의 절반(e.g. 500, 5000 ...) 이라는 뜻은 제일 앞자리만 고려하겠다는 뜻
// - 5001 => 밑자리는 무시하여 10000으로 계산했기 때문에 틀림
// 시도 2 : 자리 단위로 나누어서(2554 => 2000 + 500 + 50 + 4) 각각 구함 => 내림 밖에 할 수 없으므로 틀린 답
// 시도 3 : bfs(시간 초과)

// 답
// - 5 초과, 5, 5 미만 세 범위로 나눠야 하는 이유?
// - 5는 올림, 버림 여부에 따라 그 앞자리가 변동되기 때문에 항상 올리거나 버리거나 할 수 없다
// - 45 => 버림으로 처리해야 더 빠름
// - 55 => 올림으로 처리해야 더 빠름
