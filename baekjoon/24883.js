// 자동완성 : 구현
const input = require("fs").readFileSync(0, "utf-8").trim();
const str = input === 'N' || input === 'n' ? 'D2' : 'Whale'
console.log(`Naver ${str}`);
