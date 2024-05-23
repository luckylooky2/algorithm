// 가장 긴 단어 : 정규 표현식
const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const text = input;
const regex = /[A-Za-z-]+/g;
let answer = "";

const candidates = text.match(regex);

for (const word of candidates) {
  if (answer.length < word.length) {
    answer = word;
  }
}

console.log(answer.toLowerCase());
