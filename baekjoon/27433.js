// 팩토리얼 2 : 수학
console.log(
  Array.from({ length: +require("fs").readFileSync(0, "utf-8").trim() }, (_, i) => BigInt(i + 1))
    .reduce((acc, cur) => acc * cur, 1n)
    .toString()
);
