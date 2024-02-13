// 암호 만들기 : 백트래킹, 조합
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const [l, c] = input.shift().map((v) => Number(v));
const chars = input.shift().sort();
const visited = new Array(c).fill(false);
const answer = [];
const checkAnswer = (visited) => {
  const selected = [];
  let cnt1 = 0,
    cnt2 = false;
  for (let i = 0; i < visited.length; i++) {
    if (visited[i]) {
      const char = chars[i];
      selected.push(char);
      if (
        char === "a" ||
        char === "e" ||
        char === "i" ||
        char === "o" ||
        char === "u"
      ) {
        cnt2 = true;
      } else {
        cnt1++;
      }
    }
  }
  return cnt1 > 1 && cnt2 ? selected.join("") : null;
};
(function backtrack(min, index) {
  if (index === l) {
    const res = checkAnswer(visited);
    if (res) {
      answer.push(res);
    }
    return;
  }

  for (let i = min; i < c; i++) {
    visited[i] = true;
    backtrack(i + 1, index + 1);
    visited[i] = false;
  }
})(0, 0);

console.log(answer.join("\n"));
