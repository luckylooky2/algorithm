// Multiply : 수학
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => BigInt(v)));
const [[n, m], [num1], [num2]] = input;

console.log((num1 * num2).toString());

// BigInt를 사용하는 것도 맞았는데, Destucturing을 이상하게 사용해서 틀렸다.
