// 설탕 배달 : 동적 계획법, 그리디
const fs = require("fs");
const [amount] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v, 10));

let three = 0,
  five = 0;

for (i = Math.floor(amount / 5); i >= 0; i--) {
  let rest = amount - i * 5;
  if (rest === 0) {
    five = i;
    break;
  } else if (rest % 3 === 0) {
    five = i;
    three = rest / 3;
    break;
  }
}
console.log(i == -1 ? i : five + three);
