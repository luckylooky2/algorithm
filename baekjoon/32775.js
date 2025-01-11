// 가희와 4시간의 벽 1 : 구현
const [rail, flight] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => +v);

if (flight < rail) {
  console.log("flight");
} else {
  console.log("high speed rail");
}
