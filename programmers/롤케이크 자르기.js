// 롤케이크 자르기 : 브루트 포스
function solution(topping) {
  var answer = 0;
  const [chulsoo, brother] = [
    new Array(10001).fill(0),
    new Array(10001).fill(0),
  ];
  let [chulsooCnt, brotherCnt] = [0, 0];
  chulsoo[topping[0]] = 1;
  chulsooCnt = 1;
  for (const elem of topping.slice(1, topping.legnth)) {
    if (brother[elem] === 0) {
      brotherCnt++;
    }
    brother[elem]++;
  }
  for (let i = 0; i < topping.length; i++) {
    const toppingNum = topping[i];
    if (i) {
      if (chulsoo[toppingNum]) {
        chulsoo[toppingNum]++;
      } else {
        chulsoo[toppingNum] = 1;
        chulsooCnt++;
      }
      if (brother[toppingNum] === 1) {
        brother[toppingNum] = 0;
        brotherCnt--;
      } else {
        brother[toppingNum]--;
      }
    }
    if (chulsooCnt === brotherCnt) {
      answer++;
    }
  }
  return answer;
}

// 23'34" / 60'00"

// 첫 번째 시도: 맵(Object)에 저장. Object.entries()로 숫자를 카운트 => 여기서 시간 초과 발생
// 두 번째 시도: 배열에 저장. 이번 값이 (철수 입장에서(추가) 0이면 카운트 증가), (동생 입장에서(제거) 1이면 카운트 감소)
