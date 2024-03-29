// 같이 눈사람 만들래? : 정렬, 투 포인터
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const sortFunction = (a, b) => a - b;
const snowRadius = input.shift().slice().sort(sortFunction);
(function solve() {
  let answer = Infinity;

  for (let i = 0; i < n; i++) {
    for (let j = i + 3; j < n; j++) {
      let l = i + 1,
        r = j - 1;
      const outerSum = snowRadius[i] + snowRadius[j];
      while (l < r) {
        const innerSum = snowRadius[l] + snowRadius[r];
        answer = Math.min(answer, Math.abs(outerSum - innerSum));
        if (answer === 0) {
          console.log(0);
          return;
        }
        if (outerSum - innerSum > 0) {
          l++;
        } else {
          r--;
        }
      }
    }
  }
  console.log(answer);
})();

// 투 포인터
// - "정렬된 배열"에서 두 요소의 합이나 차를 계산할 때 사용
// - 불가능한 경우를 배제할 수 있기 때문에, 더 적은 시간 복잡도로 구할 수 있다: O(n^2) => O(n)
// - 두 요소의 합이나 차가 기준 값에 근접한 값을 따라감
// - e.g.
// - 1) 기준 값이 존재하는 경우 : 배열 [1, 3, 5, 7, 8]에서 두 요소의 합이 12인 두 요소 고르기
// - (1, 8) => (3, 8) : 1이 포함된 경우는 확실히 제외할 수 있으므로 purge, 가장 큰 값을 더했어도 작기 때문에
// - (3, 8) => (5, 8) => (5, 7)
// - 2) 기준 값이 존재하지 않는 경우 : 배열 [1, 3, 5, 7, 9]에서 두 요소의 합이 7인 두 요소 고르기
// - (1, 9) => (1, 7) => (1, 5) => (3, 5)
// - 후보 : (1, 3), (1, 5), (3, 5) 중 (1, 5), (3, 5)만 확인
// - 불가능한 경우를 포인터로 제외하기 때문에 더 효과적인 시간 복잡도로 구할 수 있음

// 투 포인터 알고리즘은 주로 "정렬된 배열" 또는 리스트에서 두 개의 포인터를 사용하여 원하는 조건을 만족하는 부분을 찾거나 최적의 해를 구하는 데 사용됩니다.
// 주로 다음과 같은 상황에서 활용됩니다:
// 1. 두 요소의 합이나 차를 계산할 때: 두 포인터를 배열의 양 끝에서 출발하여 한쪽 방향으로 이동하면서 합이나 차가 원하는 값을 가질 때까지 포인터를 조절합니다.
// 2. 부분 배열 또는 부분 리스트의 합이나 길이를 최적화할 때: 배열이나 리스트에서 특정 조건을 만족하는 부분 배열의 길이를 최소화하거나 최대화할 때 사용될 수 있습니다.
// 3. 포인터를 이동시키며 조건을 만족하는 부분을 찾을 때: 특정 조건을 만족하는 부분을 찾거나 세그먼트의 길이를 최소화하거나 최대화할 때 사용됩니다.
// 4. 이진 탐색과 함께 사용될 때: 정렬된 배열에서 이진 탐색과 투 포인터를 함께 사용하여 특정 조건을 만족하는 부분을 찾을 수 있습니다.
// 투 포인터 알고리즘은 보통 정렬된 배열이나 리스트에서 사용되며, 배열이나 리스트의 요소를 일일이 비교하거나 이동하지 않고도 원하는 조건을 만족하는 부분을 찾을 수 있어 효율적입니다.
