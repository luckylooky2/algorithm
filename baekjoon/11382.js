// 꼬마 정민 : 구현
console.log(
  require("fs")
    .readFileSync(0, "utf-8")
    .trim()
    .split(" ")
    .map((v) => +v)
    .reduce((acc, curr) => acc + curr, 0)
);
