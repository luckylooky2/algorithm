// Pipelined : 수학, 그리디, 애드 혹
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const arr = input.shift();
const max = arr.sort((a, b) => b - a)[0];
console.log(max + arr.length - 1);

// 배열의 길이가 너무 크면, Math.max(...arr)은 Maximum call stack size exceeded 오류가 발생할 수 있다.
// 모든 요소가 인자로 전달되기 떄문이다.
// 채점 환경마다 다르다. softeer는 런타임 에러가 발생했는데, baekjoon은 오류가 발생하지 않았다.
