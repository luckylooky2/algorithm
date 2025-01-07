// 코드마스터 2023 : 구현
const str = require("fs").readFileSync(0, "utf-8").toString().trim();
let answer = 0;

if (str === "SONGDO") {
  answer = "HIGHSCHOOL";
} else if (str === "CODE") {
  answer = "MASTER";
} else if (str === "2023") {
  answer = "0611";
} else if (str === "ALGORITHM") {
  answer = "CONTEST";
}

console.log(answer);
