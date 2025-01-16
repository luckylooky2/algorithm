// 진흥원 세미나 : 구현
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const n = +input.shift();
const seminar = [
  "Algorithm",
  "DataAnalysis",
  "ArtificialIntelligence",
  "CyberSecurity",
  "Network",
  "Startup",
  "TestStrategy",
];
const room = ["204", "207", "302", "B101", "303", "501", "105"];
const answer = [];

for (const str of input) {
  answer.push(room[seminar.indexOf(str)]);
}

console.log(answer.join("\n"));
