// SUAPC 2024 Winter : 구현
const n = +require("fs").readFileSync(0, "utf-8").trim();
const wrong = ["IK", "BDJK", "BDJK", "DIJK", "BDIJK", "BDIJK", "BDIJK", "BDIJK", "BDIJK", "DEIJK"];

const answer = "ABCDEFGHIJKLM".split("").filter((v) => !wrong[n - 1].includes(v));

console.log(answer.length);
console.log(answer.join(" "));
