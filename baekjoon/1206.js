// 사람의 수 : 브루트 포스, 이분 탐색
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const N = parseInt(input[0]);
const averages = input.slice(1, N + 1);

function isPossibleCnt(cntOfPeople, averages) {
  for (let avg of averages) {
    let left = 0; // 모두 0점
    let right = 10 * cntOfPeople; // 모두 10점
    let isPossible = false;

    while (left <= right) {
      const sumOfScore = Math.floor((left + right) / 2);
      // 유효한 소수점 세 자리를 구하기 위해 1000을 곱하고 나눈다.
      const currentAvg = Math.floor((sumOfScore * 1000) / cntOfPeople);

      // avg를 찾을 수 있는 경우, isPossible = true
      // - 다음 avg를 찾는다.
      if (currentAvg === avg) {
        // 실행될 일은 없지만 예외 처리를 위해 추가
        if (currentAvg > 10 * 1000) {
          continue;
        }
        isPossible = true;
        break;
      } else if (currentAvg > avg) {
        right = sumOfScore - 1;
      } else {
        left = sumOfScore + 1;
      }

      // avg를 찾을 수 없는 경우, isPossible = false
      // - 모든 조건을 만족하지 않음
    }

    if (!isPossible) return false;
  }
  return true;
}

function findMinPeople(n, inputs) {
  // 여기서
  const averages = inputs.map((input) => {
    const parts = input.split(".");
    return parseInt(parts[0] + parts[1], 10);
  });

  for (let cntOfPeople = 1; cntOfPeople <= 1000; cntOfPeople++) {
    if (isPossibleCnt(cntOfPeople, averages)) {
      console.log(cntOfPeople);
      break;
    }
  }
}

findMinPeople(N, averages);

// 이전 로직은 왜 안 됐는가?
// - 19 / 917 이런 값들에서 오차가 발생해서?
