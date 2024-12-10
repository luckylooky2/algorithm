// 시험 성적 : 구현
const number = +require("fs").readFileSync(0, "utf-8").trim();
let answer;
if (number >= 90) {
  answer = "A";
} else if (number >= 80) {
  answer = "B";
} else if (number >= 70) {
  answer = "C";
} else if (number >= 60) {
  answer = "D";
} else {
  answer = "F";
}

console.log(answer);
