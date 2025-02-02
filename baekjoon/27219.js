// Робинзон Крузо : 수학
const n = +require("fs").readFileSync(0, "utf-8").trim();
console.log("V".repeat(Math.floor(n / 5)) + "I".repeat(n % 5));
