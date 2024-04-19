// 조이스틱 : dfs, 브루트 포스
let n,
  answer = Infinity;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .split("")
  .reduce((acc, curr, index) => {
    const ret = { ...acc };
    ret[curr] = index;
    return ret;
  }, {});

function isComplete(name, curr) {
  let res = 0;
  for (let i = 0; i < name.length; i++) {
    if (name[i] === curr[i]) {
      res++;
    }
  }
  return name.length === res;
}

function dfs(name, curr, cursor, total) {
  if (isComplete(name, curr)) {
    answer = Math.min(answer, total);
    return;
  }

  let candidates = [];
  let minValue = Infinity;
  const n = name.length;
  for (let i = 0; i < n; i++) {
    let count = 0;
    if (curr[i] === name[i]) {
      continue;
    }
    const cursorDiff = Math.abs(cursor - i);
    if (cursorDiff > Math.floor(n / 2)) {
      count = n - cursorDiff;
    } else {
      count = cursorDiff;
    }
    if (minValue > count) {
      candidates = [];
      minValue = count;
    }
    if (minValue === count) {
      candidates.push([count, i]);
    }
  }
  for (const [min, minIndex] of candidates) {
    curr[minIndex] = name[minIndex];
    total += min;
    dfs(name, curr, minIndex, total);
    curr[minIndex] = "A";
    total -= min;
  }
}

function diff(name) {
  let res = 0;
  const init = name.slice().fill("A");
  for (let i = 0; i < name.length; i++) {
    const alphaDiff = Math.abs(alphabet[init[i]] - alphabet[name[i]]);
    if (alphaDiff > 13) {
      res += 26 - alphaDiff;
    } else {
      res += alphaDiff;
    }
  }
  return res;
}

function solution(input) {
  const name = input.split("");
  n = name.length;
  for (let i = 0; i < name.length; i++) {
    const curr = name.slice().fill("A");
    if (curr[i] !== name[i]) {
      dfs(name, curr, i, i > Math.floor(n / 2) ? n - i : i);
    }
  }
  return answer === Infinity ? 0 : answer + diff(name);
}

// 그리디 : 가장 가까운 인덱스로 이동하는 방법 => 실패(ABAAABAAAAAAAB)
// 그리디 + dfs : 가장 가까운 인덱스가 여러 개인 경우, dfs => 실패(13, 23, 25 => BBBBAAAABA)
// 그리디 + dfs + 첫 시작점 완전 탐색 => 성공
