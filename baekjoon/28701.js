// 세제곱의 합 : 수학
const n = +require("fs").readFileSync(0, "utf8").trim();
const sum = (n * (n + 1)) / 2;

console.log(sum);
console.log(Math.pow(sum, 2));
console.log(Array.from({ length: n }, (_, i) => Math.pow(i + 1, 3)).reduce((a, b) => a + b));
