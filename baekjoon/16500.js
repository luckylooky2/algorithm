// 문자열 판별 : 문자열, 동적 계획법
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const S = input.shift();
const n = +input.shift();
const A = new Set(input);
const dp = Array(S.length + 1).fill(false);
dp[0] = true;

// i번째 글자를 기준으로 j까지의 문자열을 만들 수 있고, j번째 글자에서 i번째 글자까지의 문자열이 A에 포함되어 있으면, dp[i] = true
for (let i = 1; i <= S.length; i++) {
  for (let j = 0; j < i; j++) {
    if (dp[j] && A.has(S.substring(j, i))) {
      dp[i] = true;
      break;
    }
  }
}

console.log(dp[S.length] ? 1 : 0);

// Try 1: dfs => 시간 초과
// - A의 문자열 중에 중복되는 문자열을 제거하여 시간을 줄여보려고 했다.
// - S에 포함된 문자열 && 서로 다른 문자열 && 임의의 str1로 임의의 str2를 만들 수 없어야 함 => 여전히 시간 초과

// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
// 8
// aa
// aaaa
// aaaaaa
// aaaaaaaaaa
// aaaaaaaaaaaa
// aaaaaaaaaaaaaaaaaaaa
// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

// Try 2: dp
// - 특정 지점까지 만들 수 있는지 여부를 저장한다. 어떤 것이 만들어졌는지는 상관이 없다.
// - 이후 지점부터 현재 지점까지의 substring이 A에 포함되어 있는지를 확인하면 현재 문자열을 만들 수 있는지 판단할 수 있게 된다.
// - 단계적으로 생각하는 것이 중요하다. 현재 지점까지 만들 수 있는지를 판단하는 것이 중요하다.
