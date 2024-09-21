// 가르침 : 브루트 포스, 비트마스킹, 백트래킹, 조합
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const [n, k] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const words = input;
const charBit = new Array(n).fill(0);
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("").reduce((acc, curr, i) => {
  acc[curr] = i + 1;
  return acc;
}, {});
const bit = new Map();
const all = {};

let start = 2;
for (let i = 1; i <= 26; i++) {
  bit.set(start, i);
  start *= 2;
}

for (let i = 0; i < n; i++) {
  const word = words[i];
  for (const char of word) {
    if (!(char === "a" || char === "n" || char === "t" || char === "i" || char === "c")) {
      charBit[i] |= 1 << alphabet[char];
      all[char] = true;
    }
  }
}

const candidates = Object.entries(all).map(([k, _v]) => k);
const canSelect = k - 5;
let answer = 0;

function recur(candidates, count, visited = [], curr = 0) {
  if (visited.length === count) {
    let complete = 0;
    let comp = 0;
    for (const char of visited) {
      comp |= 1 << alphabet[char];
    }
    for (const bit of charBit) {
      // 비트마스킹을 하는 이유
      // - 예를 들어 1, 3, 5 중에 1, 5가 포함되어 있는지를 **bitwise OR 연산 한 번으로** 구할 수 있음
      // - 즉, O(n) => O(1)로 시간 복잡도를 줄일 수 있음
      const result = bit | comp;
      if (result === comp) {
        complete++;
      }
    }
    answer = Math.max(answer, complete);
    return;
  }

  // 조합의 수 세기 => 5개를 제외할 수 있어서 경우의 수를 줄일 수 있음
  for (let i = curr; i < candidates.length; i++) {
    if (visited.includes(candidates[i])) {
      continue;
    }
    visited.push(candidates[i]);
    recur(candidates, count, visited, i);
    visited.pop();
  }
}

if (canSelect >= 0 && candidates.length) {
  // candidates 길이보다 canSelect이 큰 경우, answer를 최신화하는 로직에 걸리지 않기 때문에 최대 candidates 길이로 제한하는 것이 필요
  recur(candidates, Math.min(canSelect, candidates.length));
} else if (canSelect >= 0 && candidates.length === 0) {
  // 중복이 없을 것이라고 생각해서 1로 고정했는데, antatica, antaaaatica처럼 중복이 가능
  answer = n;
}

console.log(answer);
