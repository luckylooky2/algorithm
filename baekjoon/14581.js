// 팬들에게 둘러싸인 홍준 : 구현
const string = require("fs").readFileSync(0, "utf-8").trim();
const arr = [
  ["fan", "fan", "fan"],
  ["fan", string, "fan"],
  ["fan", "fan", "fan"],
];
const answer = arr.map((v) => v.map((v) => `:${v}:`));
console.log(answer.map((v) => v.join("")).join("\n"));
