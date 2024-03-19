// 유사 칸토나 비트열 : 재귀, 분할 정복
const cache = {
  "00": 1,
  "01": 2,
  "02": 2,
  "03": 3,
  "04": 4,
  11: 1,
  12: 1,
  13: 2,
  14: 3,
  22: 0,
  23: 1,
  24: 2,
  33: 1,
  34: 2,
  44: 1,
};

function recur(n, start, end, l, r) {
  if (end < l || start > r) {
    return 0;
  }

  const mid = Math.ceil((start + end) / 2);
  const offset = (Math.pow(5, n - 1) - 1) / 2;
  const first = mid - offset;
  const second = mid + offset;
  const firstMid = Math.ceil((start + first) / 2);
  const secondMid = Math.ceil((second + end + 1) / 2);

  if (n === 1 && start <= l && l <= end) {
    start = l;
  }
  if (n === 1 && start <= r && r <= end) {
    end = r;
  }

  if (n === 1) {
    const s = start % 5 ? (start % 5) - 1 : 4;
    const e = end % 5 ? (end % 5) - 1 : 4;
    return cache[`${s}${e}`];
  }

  return (
    recur(n - 1, start, firstMid - 1, l, r) +
    recur(n - 1, firstMid, first - 1, l, r) +
    recur(n - 1, second + 1, secondMid - 1, l, r) +
    recur(n - 1, secondMid, end, l, r)
  );
}

function solution(n, l, r) {
  return recur(n, 1, Math.pow(5, n), l, r);
}

// 110'00" / 60'00"

// 이 문제처럼 같은 패턴이 반복되는 것은 재귀(dfs, 분할 정복)을 바로 떠올리고 구조를 짜자
// 시도 1 : 분할 정복은 떠올렸으나, 한 번에 범위를 정해려고 했던 것이 문제였음
// - 큰 문제를 네 개의 작은 문제로 나눈다
// - e.g. [4, 17]을 [4, 5], [6, 10], [16, 17]로 바로 나누려고 시도

// 시도 2 : 한 번에 모든 것을 하려고 하지 말고, 단계별로 생각한다
// - **내부에서도 충분히 예외 처리를 할 수 있다. 조급하게 한 번에 처리하려고 생각하지 말자**
// - 1) [0, 5], [6, 10], [16, 20], [21, 25] 로 먼저 나눈다
// - 2) [start, end] 구간에 [l, r]이 겹치지 않는 구간을 제외한다 => (end < l || start > r) : 자주 쓰일 것 같으니 알아 두자!
// - 3) 가장 작은 문제(n = 1)까지 나누고 l, r을 여기서 업데이트한다
// - 4) 작은 문제에서 반환된 값을 모두 더하며 값을 구한다

// 캐시를 하드코딩했지만, 조금 더 효율적으로 작성하는 방법이 있을 듯?
