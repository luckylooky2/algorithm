// 큰 수 A+B : 수학
console.log(
  "" +
    require("fs")
      .readFileSync(0, "utf-8")
      .trim()
      .split(" ")
      .map((v) => BigInt(v))
      .reduce((acc, curr) => acc + curr)
);
