// Who is in the middle? : 정렬
console.log(
  require("fs")
    .readFileSync(0, "utf-8")
    .trim()
    .split("\n")
    .map((v) => +v)
    .sort((a, b) => a - b)[1]
);
