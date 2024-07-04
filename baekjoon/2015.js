// 수들의 합 4 : 누적합
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, k] = input.shift();
const arr = input.shift();
let answer = 0;
const sum = new Array(n).fill(0);

// 0:i번째 인덱스까지 누적합을 담은 배열을 완성
sum[0] = arr[0];
for (let i = 1; i < sum.length; i++) {
  sum[i] = sum[i - 1] + arr[i];
}

// 각 누적 합이 등장한 횟수를 저장
// - 왜 시작 값이 1?
const count = { 0: 1 };

// e.g. [ 2, 0, 2, 0 ]
for (let i = 0; i < n; i++) {
  // 현재 값 : 0
  const currentSum = sum[i];
  // 목표 값 : 0
  const targetSum = currentSum - k;

  // 목표 값이 존재한다는 뜻은 이전에 등장한 누적 합이라는 뜻
  // - 즉, 현재 누적 합에서 이전에 등장한 누적 합을 빼면 그 구간 부분 배열의 합이 정확히 k가 된다
  // - 여기서는 정확히 a:b 인덱스를 알 수는 없지만, 개수는 알 수 있다
  if (count[targetSum] !== undefined) {
    answer += count[targetSum];
  }

  // 업데이트
  if (count[currentSum] === undefined) {
    count[currentSum] = 1;
  } else {
    count[currentSum]++;
  }
}

console.log(answer);

// 누적합 알고리즘

// Try 1
// - O(n^2) : 길이 n의 누적 합 배열을 만들고, 0번부터 현재 인덱스까지 현재 값을 더하면서 k이면 answer++
// - 시간 초과

// Try 2
// - 누적 합 배열을 만들고 정렬 및 중복 값을 제거한 후, 이분 탐색으로 목표 값을 찾고 원소 개수를 answer에 더한다
// - 자신이 자신을 빼는 경우를 제외하지 않았기 때문에 예외처리가 까다로움
// - "순서에 대한 정보도 필요"하기 때문에 정렬 및 중복 값 제거를 하면 안 될 것 같다

// Try 3
// - 누적 합 배열에서 등장한 원소의 개수를 센다
// - 2[0:0], 0[0:1], 2[0:2], 0[0:3]
// - 누적 합은 현재 [0:n] - [0:n-x]의 형태로 표현할 수 있으므로 앞에서 나온 누적 합의 개수를 세면 목표 값의 개수를 구할 수 있다
