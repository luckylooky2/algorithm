// UOS 문자열 : 구현
console.log("UOS"[(+require("fs").readFileSync(0, "utf-8").trim() - 1) % 3]);