// 수 묶기 : 그리디, 정렬, 많은 조건 분기
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => +v);
const n = input.shift();
const arr = input;
let answer = 0;
const positive = arr.filter((v) => v > 0).sort((a, b) => a - b);
const others = arr.filter((v) => v <= 0).sort((a, b) => b - a);

// positive
for (let i = positive.length - 1; i >= 0; i -= 2) {
  if (i) {
    if (positive[i] === 1 || positive[i - 1] === 1) {
      answer += positive[i] + positive[i - 1];
    } else {
      answer += positive[i] * positive[i - 1];
    }
  } else {
    answer += positive[i];
  }
}

// negative
for (let i = others.length - 1; i >= 0; i -= 2) {
  answer += i ? others[i] * others[i - 1] : others[i];
}

console.log(answer);

// 단순히 생각했을 때
// - 양수는 가장 큰 수끼리 곱하는 것이 결과가 클 것이다. e.g. [1 2 3 4]: 2 + 12, 6 + 4, 8 + 3, [1 2 3]: 6 + 1
// - 양수는 어떠한 경우에도 0과 곱하면 안 된다.
// - 양수는 곱할 양수가 없으면 그냥 더한다.
// - 1을 포함한 양수는 더하는 것이 더 크다.

// - 음수는 음수끼리 곱하면 양수가 된다. => 우선순위: 음수 > 0
// - 음수는 0과는 곱해도 된다.
// - 0은 0끼리 곱해도 된다.
// - 음수는 곱할 음수나 0이 없으면 그냥 더한다.
