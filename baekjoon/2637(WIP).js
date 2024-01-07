// 장난감 조립
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const [relationCnt] = input.shift();
const relation = input.sort((a, b) => a[0] - b[0]);
const isMiddlePart = new Array(n + 1).fill(false);

for (let elem of relation) {
  if (!isMiddlePart[elem[0]]) isMiddlePart[elem[0]] = true;
}

console.log(relation, n, isMiddlePart);

// 중간 부품이 아닌 기본 부품만 출력
