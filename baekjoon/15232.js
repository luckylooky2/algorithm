// Rectangles : 구현
const [r, c] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => +v);

console.log(
  new Array(r)
    .fill(null)
    .map(() => "*".repeat(c))
    .join("\n")
);
