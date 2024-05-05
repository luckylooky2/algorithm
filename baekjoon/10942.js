// 팰린드롬? : 동적 계획법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = Number(input[0]);
const arr = [null].concat(input[1].split(" ").map((v) => Number(v)));
const m = Number(input[2]);
const questions = input
  .slice(3, input.length)
  .map((v) => v.split(" ").map((v) => Number(v)));
const dp = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(0));
const dpbool = new Array(n + 1)
  .fill(null)
  .map(() => new Array(n + 1).fill(false));
const answer = [];

// init
for (let i = 1; i <= n; i++) {
  dp[i][i] = 1;
  dpbool[i][i] = true;
}
for (let i = 1; i < n; i++) {
  dp[i][i + 1] = arr[i] === arr[i + 1] ? 2 : 0;
  dpbool[i][i + 1] = arr[i] === arr[i + 1] ? true : false;
}

// 1개 시작. e.g. '3' => '131', '21312' ...
for (let i = n - 1; i >= 2; i--) {
  let [prevStart, prevEnd] = [i, i];
  let [start, end] = [prevStart - 1, prevEnd + 1];
  while (end <= n && start >= 1) {
    if (arr[start] === arr[end] && dpbool[prevStart][prevEnd]) {
      dp[start][end] = dp[prevStart][prevEnd] + 2;
      dpbool[start][end] = true;
    } else {
      dp[start][end] = dp[prevStart][prevEnd];
    }
    prevStart = start;
    prevEnd = end;
    start--;
    end++;
  }
}

// 2개 시작. e.g. '31' => '1312', '213121' ...
for (let i = n - 1; i >= 2; i--) {
  let [prevStart, prevEnd] = [i, i + 1];
  let [start, end] = [prevStart - 1, prevEnd + 1];
  while (end <= n && start >= 1) {
    if (arr[start] === arr[end] && dpbool[prevStart][prevEnd]) {
      dp[start][end] = dp[prevStart][prevEnd] + 2;
      dpbool[start][end] = true;
    } else {
      dp[start][end] = dp[prevStart][prevEnd];
    }
    prevStart = start;
    prevEnd = end;
    start--;
    end++;
  }
}

for (const [start, end] of questions) {
  answer.push(dpbool[start][end] ? 1 : 0);
}

console.log(answer.join("\n"));

// 팰린드롬의 성질
// - 양쪽 바깥에서부터 하나씩 안쪽으로 움직일 때, 모든 값이 일치하는 문자열

// 1) 바깥쪽 => 안쪽 방향(start++, end--)으로 코드를 작성
// - dp 배열을 사용하지 않고, 주어진 케이스에서 안쪽 방향으로 팰린드롬 확인
// - arr[start++] === arr[end--] 이면, 팰린드롬
// - 팰린드롬일 경우 => 현재 팰린드롬에서 파생될 수 있는(안쪽 방향으로) 모든 팰린드롬을 캐싱한다
// - 시간 초과 발생

// 2) 안쪽 => 바깥쪽 방향(start--, end++)으로 코드를 작성
// - dp 배열을 사용. row와 column은 각각 문자열 시작 인덱스와 끝 인덱스
// - e.g. dp[2][5] : 2번 ~ 5번 인덱스로 slice한 문자열의 최대 팰린드롬의 길이
// - dp 테이블을 기존처럼 column 증가 방향으로 채우는 것이 아니라 start - 1, end + 1 방향(\)으로 채워야 한다
// - 대각선 방향으로 값을 초기화할 필요가 있음 => 1개인 경우(dp[i][i]), 2개인 경우(dp[i][i + 1])
// - arr[start--] === arr[end++] 이면, 팰린드롬
// - 팰린드롬일 경우 => 이전 펠린드롬 + 2 값을 저장

// 1. 팰린드롬을 만드는 방법은 바깥쪽 => 안쪽 뿐만 아니라 안쪽 => 바깥쪽도 있다. 유연하게 생각하자
// 2. dp 테이블을 반드시 column 증가 방향으로만 채워야 하는 것은 아니다 => 점화식이 어떻게 구성되어 있는가에 따라 채우는 방향이 달라진다
