// 쇠막대기 : 스택
const prths = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("");
const stack = [];
let num = 0;

let answer = 0;
const LEFT = "(";
const RIGHT = ")";

// w/o stack
// while (i < prths.length) {
//   // 현재 LEFT일 때
//   if (prths[i] === LEFT) {
//     // 다음이 LFET
//     // 항상 RIGHT로 끝나기 때문에 i + 1 >= legnth인 것은 고려하지 않아도 됨
//     if (prths[i + 1] === LEFT) num++;
//     // 다음이 RIGHT(LASER)
//     else if (prths[i + 1] === RIGHT) {
//       answer += num;
//       i++;
//     }
//   } else if (prths[i] === RIGHT) {
//     num--;
//     answer += 1;
//   }
//   i++;
// }

// w/ stack
prths.map((v) => {
  if (v === LEFT) num++;
  else {
    num--;
    if (stack[stack.length - 1] === LEFT) answer += num;
    else if (stack[stack.length - 1] === RIGHT) answer += 1;
  }
  stack.push(v);
});

console.log(answer);
