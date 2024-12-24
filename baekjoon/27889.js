// 특별한 학교 이름 : 문자열
const input = require("fs").readFileSync(0, "utf-8").trim();
const school = {
  NLCS: "North London Collegiate School",
  BHA: "Branksome Hall Asia",
  KIS: "Korea International School",
  SJA: "St. Johnsbury Academy",
};

console.log(school[input]);
