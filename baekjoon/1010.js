// 다리 놓기 : 조합, 동적 계획법
const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v, i) =>
    i === 0 ? parseInt(v, 10) : v.split(" ").map((v) => parseInt(v, 10))
  );

const cache = {};

function combination(n, r) {
  // 캐시에서 결과를 찾아 반환
  if (cache[`${n}C${r}`]) {
    return cache[`${n}C${r}`];
  }

  if (r === 0 || n === r) {
    return 1;
  }

  // 캐시에 저장하고 재귀적으로 계산
  const result = combination(n - 1, r - 1) + combination(n - 1, r);
  cache[`${n}C${r}`] = result;

  return result;
}

// 1부터 시작
for (let i = 1; i <= input[0]; i++) {
  console.log(combination(input[i][1], input[i][0]));
}

console.log(cache);
