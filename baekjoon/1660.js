// 캡틴 이다솜 : 동적 계획법, 슬라이딩 윈도우
const n = +require("fs").readFileSync(0, "utf-8").trim();
const tri2 = [0];
const tri3 = [0];
let prev = 1;

while (true) {
  const next2 = tri2.at(-1) + prev;
  const next3 = tri3.at(-1) + next2;
  tri2.push(next2);
  tri3.push(next3);
  prev++;
  if (next3 > n) {
    break;
  }
}

tri3.shift();

const dp = new Array(n + 1).fill(0);

for (let i = 1; i <= n; i++) {
  dp[i] = i;
}

for (let i = 1; i < tri3.length; i++) {
  const target = tri3[i];
  for (let j = target; j <= n; j++) {
    dp[j] = Math.min(dp[j], dp[j - target] + 1);
  }
}

console.log(dp[n]);

// 중복된 totals의 원소를 가지고 n을 만드는 최소 개수 => 동전 문제
// - 동전 문제는 만들 수 있는 경우의 수를 세는 것이라고 한다면, 배낭 문제에 더 가깝다고 할 수 있다.

// Try 1
// - [i - 2, 1], [i - 3, 2], ... 의 조합 중에서 가장 작은 것을 dp[i]에 저장 => 시간 초과

// Try 2
// - 정사면체 배열 * n 크기의 2차원 dp 배열 => 메모리 초과
// - 슬라이딩 윈도우를 적용하여 2줄로 최적화

// Try 3
// - 1줄로 최적화
// - 이전 줄에서 계산한 결과가 dp 배열에 저장되어 있고, 더 적은 값으로 바꾸기만 하면 되기 때문이다.
// - 더 적은 값은 같은 줄에서 j - target으로 접근하기 때문에 이전 줄의 정보가 필요하지 않다.

// 배낭 문제, 누적 합?
