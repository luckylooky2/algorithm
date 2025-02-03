// Cow Pizza : 브루트 포스, 비트 마스킹
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [toppings, constraintCount] = input.shift();
const constraints = input.map((v) => {
  let bitwise = 0;
  v.slice(1).forEach((i) => (bitwise |= 1 << (i - 1)));
  return bitwise;
});

function checkConstraint(constraints, target) {
  for (const constraint of constraints) {
    if ((constraint & target) === constraint) {
      return true;
    }
  }

  return false;
}

function recur(constraints, offset = 0, bitwise = 0) {
  let count = 1;

  if (checkConstraint(constraints, bitwise)) {
    count--;
  }

  if (offset === toppings) {
    return count;
  }

  for (let i = offset; i < toppings; i++) {
    count += recur(constraints, i + 1, bitwise | (1 << i));
  }

  return count;
}

console.log(recur(constraints));
