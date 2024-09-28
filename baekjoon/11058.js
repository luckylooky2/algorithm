// 크리보드 : 브루트 포스, 수학, 동적 계획법
const n = +require("fs").readFileSync(0, "utf-8").trim();
const answer = new Array(n + 1).fill(0).map((_v, i) => i);

// 곱했을 때 가장 큰 값이 나오도록 나누는 방법은 고르게 나누는 것
// e.g. 6: (3, 3 => 9), (2, 4 => 8), (1, 5 => 5)
function split(can, blocks) {
  const min = Math.floor(can / blocks);
  const rest = can - min * blocks;
  const res = [];
  for (let i = 0; i < blocks; i++) {
    res.push(BigInt(min));
  }
  for (let i = 0; i < rest; i++) {
    res[i]++;
  }
  return res;
}

for (let i = 6; i <= n; i++) {
  let max = 0n;
  for (let j = 0; j < Math.floor(i / 2); j++) {
    const avail = i - j;
    // avail: 블록 개수로 나눌 총 숫자
    // j + 1: 나눌 블록 개수
    const result = split(avail, j + 1);
    const count = result.reduce((acc, curr) => acc * curr, 1n);
    if (max < count) {
      max = count;
    }
  }
  answer[i] = max;
}

console.log(String(answer[n]));

// Try 1 : 일반 항 구하기
// - v가 블록 당 평균 5개 이상되면 블록의 개수를 늘린다
// - 블록의 개수를 정하는 조건이 잘못됨(모든 경우의 수를 고려하지 않음)

// Try 2 : 브루트 포스
// - 현재 개수로 만들 수 있는 모든 블록의 경우의 수를 구해서 곱해서 계산
// - 블록 개수를 늘릴 때마다 현재 개수를 차감
// - 블록 요소의 곱의 최대값은 요소의 값의 편차가 적을수록 커진다는 수학적 특징을 이용

// Try 3: dp
// - 훨씬 빠름
// - 이전에서 나온 결과를 활용하여 이후에 결과에 사용할 수 있음
// - 나는 이전 결과를 활용할 수 없다고 생각
// - answer[10]을 구하는데 있어서, answer[7]이 Ctrl-A, Ctrl-C를 한 번한 값이고 answer[9]는 Ctrl-A, Ctrl-C를 두 번한 값이라고 할 떄
// - 자연스럽게 계산된 값에 해당하는 Ctrl-A, Ctrl-C 횟수가 저장이 된다
// - 하지만 이전의 경우에서 Ctrl-A, Ctrl-C 횟수가 다른 경우를 통해서 값이 결정될 수도 있다

// for (let j = i - 3; j >= 1; j--) {
//	 // i - j - 1: 붙여넣기 횟수
//   // j번째에서 복사한 A를 i - j - 1번 붙여넣을 수 있으므로, dp[i] = dp[j] * (i - j - 1)로 계산
//   const curr = dp[j] * (i - j - 1);
//   dp[i] = Math.max(dp[i], curr);
// }

// j = 5일 때: dp[8] = max(dp[8], dp[5] * (8 - 5 - 1)) = max(0, 5 * 2) = 10
// - Ctrl-A, Ctrl-C를 5번 버튼에서 한 후, Ctrl-V를 두 번 실행하면, A가 10개가 됨
