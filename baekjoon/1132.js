// 합 : 그리디, 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = Number(input.shift());
const canBeFirst = new Array(10).fill(false);
const sum = new Array(10).fill(0);
const lines = input;
const alpha = "ABCDEFGHIJ";
const base = alpha.split("").reduce((acc, curr, index) => {
  acc[curr] = index;
  return acc;
}, {});
let answer = 0;

for (const line of lines) {
  const len = line.length;
  canBeFirst[base[line.at(0)]] = true;
  for (let i = 0; i < line.length; i++) {
    const letter = line[i];
    sum[base[letter]] += Math.pow(10, len - i - 1);
  }
}
const usedLetter = sum.filter((v) => v > 0).length;
const sorted = sum.map((v, i) => [alpha[i], v]).sort((a, b) => b[1] - a[1]);

let lastLetter = null;
let min = Infinity;
if (usedLetter === 10) {
  for (let i = 0; i < 10; i++) {
    const [alpha, value] = sorted[i];
    if (!canBeFirst[base[alpha]]) {
      if (min > value) {
        lastLetter = alpha;
        min = value;
      }
    }
  }
}

let i = 0;
for (const [alpha, value] of sorted) {
  if (alpha !== lastLetter) {
    answer += value * (9 - i);
    i++;
  }
}

console.log(answer);

// 단어 수학(1339) 문제와 유사하지만, 조건이 추가된 문제
// - 첫 번째 자리의 문자는 절대 0이 될 수 없는 조건
// - 1) sum 배열에 10^자리수의 가중치를 곱해서 누적한다
// - 2) 사용한 글자가 10개일 때, 첫 번째의 자리가 될 수 없는 문자 중에 sum의 최대값이 가장 작은 글자를 고른다
// - 3) 이 글자는 어차피 0이 될 것이므로, 마지막으로 더할 때 제외하고 가장 큰 누적 수부터 9, 8, 7 ... 순서로 곱하여 답을 도출한다
