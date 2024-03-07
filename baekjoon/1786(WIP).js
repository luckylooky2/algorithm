// 찾기
const [t, p] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let i = 0;
const answer = [];

while (i < t.length) {
  const curr = t[i];
  if (curr === p[0]) {
    i++;
    let j = 1;
    let k = 0;
    while (j < p.length && i < t.length) {
      if (t[i] !== p[j]) {
        if (p[k] === t[i]) {
          j = k + 1;
          k = 0;
        } else {
          j = 0;
          k = 0;
        }
        i++;
        continue;
      }
      if (p[j] === p[k] && j > 0) {
        k++;
      } else {
        k = 0;
      }
      i++;
      j++;
    }
    if (j === p.length) {
      answer.push(i - p.length);
      //   i = i - p.length + 1;
    }
  } else {
    i++;
  }
}

console.log(answer.length);
console.log(answer.map((v) => Number(v) + 1).join(" "));

// ABCDAXC
// ABCDAXD => 두 번째 A는 유효하지 않음

// ABCDABC
// ABCDABD => 두 번째 A는 유효함

// AAAAA
// AA 일 때, 답은 1 3이 아니라 1 2 3 4
