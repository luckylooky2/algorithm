// Conveyor Belt Sushi : 수학
console.log(
  require("fs")
    .readFileSync(0, "utf-8")
    .trim()
    .split("\n")
    .map(Number)
    .reduce((acc, curr, index) => acc + curr * (index + 3), 0)
);
