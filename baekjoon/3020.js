// 개똥벌레 : 누적 합, 이분 탐색
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
let idx = 0;
const [x, y] = input[idx++].split(" ").map((v) => +v);
const floor = new Array(y + 1).fill(0);

for (; idx <= x; idx++) {
  let barrier;
  if (idx % 2) {
    barrier = [1, +input[idx]];
  } else {
    barrier = [y - +input[idx] + 1, y];
  }

  // 시간 초과
  //   for (let i = barrier[0]; i <= barrier[1]; i++) {
  //     floor[i]++;
  //   }

  const [s, e] = barrier;
  floor[s] += 1;
  if (e !== y) {
    floor[e + 1] -= 1;
  }
}

let curr = 0;
const count = new Map();

for (let i = 1; i <= y; i++) {
  const next = floor[i] + curr;
  curr = next;
  floor[i] = curr;
  if (!count.has(floor[i])) {
    count.set(floor[i], 1);
  } else {
    count.set(floor[i], count.get(floor[i]) + 1);
  }
}

const result = [...count].sort((a, b) => a[0] - b[0]);

console.log(result[0].join(" "));

// 각 단계에서 짝수는 몇 h 이상인 것의 개수, 홀수는 y - (h - 1) 이상인 것의 개수가 부술 개수이다.
// 높이만큼 배열을 만들어놓고, 현재 길이만큼 배열에 1씩 추가하면 답이 구해짐 => 시간 초과

// [1, 3, 1]
// [2, 2, 5]
// [4, 7, 2]
// [5, 8, 1]

// 1 5 -5 1 1 0 0 -2 0
// 1 6  1 2 3 3 3  1 1

// 위 방법으로 누적 합을 구함

// 이분 탐색
// - 종유석과 석순을 각각 정렬하면서, 중복된 것을 처리하여 배열로 만든다.
// - (종유석) 높이를 기준으로 같거나 큰 인덱스를 이분 탐색으로 찾고 거기부터 배열 끝까지의 합을 리턴한다.
// - 석순도 비슷한 방법으로 세준다.
// - 모든 높이에 대해서 위의 방법을 적용한다.
