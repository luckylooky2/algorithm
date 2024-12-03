// 숫자카드 : 동적 계획법
const numStr = require("fs").readFileSync(0, "utf-8").trim();
const n = numStr.length;
const cache = {};
let answer = 0;

(function dfs(offset = 0) {
  let count = 0;
  const restStr = numStr.slice(offset);

  if (cache[restStr] !== undefined) {
    answer += cache[restStr];
    return cache[restStr];
  }

  if (offset === n) {
    answer++;
    return 1;
  }

  for (let i = 1; i <= 2; i++) {
    const next = numStr.slice(offset, offset + i);
    // 0으로 시작하는 카드는 없다는 것에 유의
    if (+next > 35 || next.startsWith("0") || offset + i > n) {
      continue;
    }

    count += dfs(offset + i);
  }

  cache[restStr] = count;
  return count;
})();

console.log(answer);

// Try 1

// 조건 1: 나눠진 수는 최대 34까지만 허용
// - 55555 => 5, 5, 5, 5, 5 한 가지
// 조건 2: 같은 경우의 수는 제외

// Try 2

// n을 1과 2의 합으로 만들 수 있는 경우의 수?
// - 모든 경우의 수를 세는 것은 시간 초과
// - 남은 문자열이 이미 계산한 문자열인 경우 캐싱이 가능

// 다른 방법
// - 숫자를 뒤에 하나씩 붙이면서, 해당 문자를 마지막으로 사용할 때까지의 가능한 조합 수를 dp 배열에 저장한다.

// 27 => 2
// 2 7
// 27

// 271 => 2
// 2 7 1
// 27 1

// 2712 => 4
// 2 7 1 2
// 27 1 2
// 2 7 12
// 27 12

// 1) 뒤에 붙이는 숫자는 한 자리 수이므로, 어떤 수이든 간에 앞의 값은 모두 유효하므로, dp[i] += dp[i - 1]
// 2) 가장 뒷 두 자리의 숫자가 10 이상 34 이하라면, dp[i] += dp[i - 2]의 경우에 두 자리 숫자로 경우의 수를 만들 수 있다.
