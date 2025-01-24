// The Fastest Sorting Algorithm In The World : 구현
const n = require("fs").readFileSync(0, "utf8").trim().split("\n").length - 1;
const answer = [];

for (let i = 1; i <= n; i++) {
  answer.push(`Case ${i}: Sorting... done!`);
}

console.log(answer.join("\n"));
