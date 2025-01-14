// 정보보호학부 동아리 소개 : 구현, 문자열
const str = require("fs").readFileSync(0, "utf-8").trim();
const target = "MWCA$";
const answer = ["MatKor", "WiCys", "CyKor", "AlKor", "$clear"];

for (let i = 0; i < 5; i++) {
  if (str === target[i]) {
    console.log(answer[i]);
    break;
  }
}
