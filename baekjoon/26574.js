// Copier : 구현
const input = require("fs").readFileSync(0, "utf8").trim().split("\n").map(Number).slice(1);
const answer = [];

for (const number of input) {
  answer.push(`${number} ${number}`);
}

console.log(answer.join("\n"));
