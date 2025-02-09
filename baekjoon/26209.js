// Intercepting Information : 구현
console.log(
  require("fs")
    .readFileSync(0, "utf-8")
    .trim()
    .split(" ")
    .map(Number)
    .every((byte) => byte === 1 || byte === 0)
    ? "S"
    : "F"
);
