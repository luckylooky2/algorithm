// 시소 짝궁 : 브루트 포스, 조합
function solution(weights) {
  var answer = 0;
  const base = 100;
  const weightCount = new Array(1000 - 100 + 1).fill(0);
  for (const weight of weights) {
    weightCount[weight - base]++;
  }
  const sortedWeight = weights.sort((a, b) => a - b);
  for (const weight of sortedWeight) {
    weightCount[weight - base]--;
    let duplicate = 0;
    for (let i = 2; i < 5; i++) {
      for (let j = 2; j < 5; j++) {
        const expectedWeight = (weight * i) / j;
        if (
          !(expectedWeight % 1) &&
          expectedWeight >= 100 &&
          expectedWeight <= 1000 &&
          weight <= expectedWeight
        ) {
          if (weight === expectedWeight) {
            duplicate += weightCount[expectedWeight - base];
          } else {
            answer += weightCount[expectedWeight - base];
          }
        }
      }
    }
    answer += duplicate / 3;
  }
  return answer;
}

// 42'28" / 60'00"

// weights 배열은 요소가 100000개이지만, 범위가 100 ~ 1000이므로 중복될 수 밖에 없다
// 그러므로 중복되는 요소 개수를 센 뒤, 100 ~ 1000 범위만 순회하면 100000번 => 990번으로 줄일 수 있다(브루트 포스 사용 가능)
// 시소 건너편 같은 위치에 있지 않은 사람(즉, 몸무게가 같지 않은 사람)은 현재 선택된 몸무게보다 큰 몸무게만 고려하면 중복을 제거할 수 있다
// 시소 건너편 같은 위치에 있는 사람(즉, 몸무게가 같은 사람)은 정확히 세 번씩 중복된다(2-2, 3-3, 4-4) => 따로 세서 3으로 나눈다
// 자신과 이미 비교된 사람을 제외하기 위해 weightCount[weight - base]-- 을 한다(누적되어 감소하므로 이미 비교된 사람을 제외하는 효과가 있다)
