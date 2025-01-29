// Mathematics : 수학
console.log(
  require("fs")
    .readFileSync(0, "utf-8")
    .trim()
    .split("\n")
    .map(Number)
    .slice(1)
    .reduce((acc, curr) => acc + curr, 0)
);
