// 스카이라인 쉬운거 : 스택
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const coords = input;
const stack = [];
let answer = 0;

for (const [_x, y] of coords) {
  // 모든 경우에 일단 push
  stack.push(y);
  if (stack.length === 1) {
    continue;
  }

  const top = stack.at(-1); // curr
  const topBelow = stack.at(-2);
  if (topBelow < top) {
    // continue
  } else if (topBelow > top) {
    // top보다 작거나 같은 것이 나올 때까지 pop
    stack.pop(); // curr을 나중에 다시 넣을 것이지만 일단 pop
    while (true) {
      const t = stack.at(-1);
      if (t <= top || stack.length === 0) {
        break;
      }

      // t <= top일 때까지 중복을 제외하고 카운트
      let prev = t;
      while (t === prev) {
        stack.pop();
        prev = stack.at(-1);
      }
      answer++;
    }

    // 위에서 뺀 curr을 다시 push
    if (y !== 0) {
      stack.push(y); // top
    }
  }
}

// 스택에 남은 값을 중복을 제외하고 카운트
while (true) {
  const t = stack.at(-1);
  if (stack.length === 0 || t === 0) {
    break;
  }

  let prev = t;
  while (t === prev) {
    stack.pop();
    prev = stack.at(-1);
  }
  answer++;
}

console.log(answer);

// a > b, a < b, a === b 경우의 수를 나눠서 생각하는게 훨씬 구조화하기 쉽다
// 일단 push하는 것처럼 일괄적으로 생각하는 것이 훨씬 경우를 나누기 쉬워질 때도 있다
