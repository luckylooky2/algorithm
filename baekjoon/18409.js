// 母音を数える (Counting Vowels) : 구현, 문자열
let answer = 0;
require("fs")
  .readFileSync(0)
  .forEach((char) => {
    switch (char) {
      case 97:
      case 101:
      case 105:
      case 111:
      case 117:
        answer++;
    }
  });

console.log(answer);
