// A+B - 9 : 수학
console.log(
  String(
    require("fs")
      .readFileSync(0, "utf-8")
      .trim()
      .split(" ")
      .map((v) => BigInt(v))
      .reduce((a, b) => a + b),
    0n
  )
);
