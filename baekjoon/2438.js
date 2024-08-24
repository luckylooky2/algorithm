// 별 찍기 - 1 : 구현
const count = Number(require("fs").readFileSync(0, "utf-8").toString().trim());
const answer = Array.from({ length: count })
  .map((_v, i) => "*".repeat(i + 1))
  .join("\n");

console.log(answer);
