// 여왕벌 : 구현, 시뮬레이션
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [size, days] = input[0];
// [0의 개수, 1의 개수, 2의 개수]
const growths = input;
const arrSize = size * 2 - 1;
const answer = [];

// 누적합 ver.
const firstColRow = new Array(arrSize).fill(0);
for (let day = 1; day <= days; day++) {
  const growth = growths[day];
  let offset = growth[0];
  for (let i = 1; i < 3; i++) {
    const count = growth[i];
    if (count === 0) {
      continue;
    }
    if (offset >= arrSize) {
      break;
    }

    // 누적 실수
    firstColRow[offset] += i;
    if (offset + count < arrSize) {
      firstColRow[offset + count] += -i;
    }
    offset += count;
  }
}

let curr = 1;
for (let i = 0; i < arrSize; i++) {
  firstColRow[i] = curr + firstColRow[i];
  curr = firstColRow[i];
}

// 느린 ver.
// const firstColRow = new Array(arrSize).fill(1);
// for (let day = 1; day <= days; day++) {
//   const growth = growths[day];
//   let offset = 0,
//     index = 0,
//     count = 0;
//   while (index < 3) {
//     while (growth[index] !== count) {
//       firstColRow[offset] += index;
//       count++;
//       offset++;
//     }
//     index++;
//     count = 0;
//   }
// }

const common = firstColRow.slice(size).join(" ");
for (let i = size - 1; i >= 0; i--) {
  answer.push(firstColRow[i] + " " + common);
}

console.log(answer.join("\n"));

// 날짜가 지날 때마다 모든 맵을 업데이트하면 시간 초과

// 결과적으로 첫 행(ㅡ), 첫 열(|)을 제외한 나머지 칸은 열 방향(아래 방향)으로 채워지게 된다
// - 첫 열(|)은 행 방향(오른쪽 방향)으로 채워지고, 첫 행(ㅡ)은 열 방향(아래 방향)으로 나머지 칸을 더 큰 숫자로 채워진다.
// - (0, 0), (1, 0), (0, 1)의 최대값으로 나머지 칸이 채워지게 된다.
// - 첫 행(ㅡ)의 요소는 첫 열(|)의 요소보다 반드시 같거나 크기 때문에, 나머지 칸은 열 방향(아래 방향)으로 채워진다.
// - 열 방향으로 채워지기 때문에 나머지 칸은 행 기준으로 볼 때, 모든 값이 같다. 따라서 2차원 배열을 굳이 만들 필요가 없다.

// 누적합을 이용하여 시간 복잡도 줄이기
// e.g. 길이 10
// - (0, 3, +1) => 0에 1 체크, 4에 -1 체크
// - (0, 5, +2) => 0에 2 체크, 6에 -2 체크
// - (0, 9, +5) => 0에 5 체크, (10에는 -5를 체크하지 않음)
// - 음수도 적용이 되는가? 가능

// (0, 3, +1)
// (2, 7, +2)
// (1, 4, -1)

// 누적 합 배열: 1 -1 2 0 -1 1 0 0 -2 0 0
// 결과 배열:   1  0 2 2  1 2 2 2  0 0 0
