// Phi Squared : 스택
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const micros = input.shift().map((v, i) => [i, v]);
let prev = micros;

// 최소 2개씩 합쳐지기 때문에 log2(n)번만에 1개로 합쳐진다.
// - 그렇기 때문에 중첩 반복문을 사용할 수 있다.
while (prev.length !== 1) {
  const next = [];
  let i = 0;

  while (i < prev.length) {
    let curr = prev[i],
      before = null,
      after = null;

    if (next.length > 0) {
      const last = next[next.length - 1];

      if (last[1] <= curr[1]) {
        before = last;
      }
    }

    if (i + 1 !== prev.length) {
      if (prev[i + 1][1] <= curr[1]) {
        after = prev[i + 1];
      }
    }

    const sum = [...curr];

    if (before) {
      const [k, v] = next.pop();
      sum[1] += v;
    }

    if (after) {
      sum[1] += after[1];
      i++;
    }

    i++;
    next.push(sum);
  }
  prev = next;
}

const answer = [prev[0][1], prev[0][0] + 1];

console.log(answer.join("\n"));
