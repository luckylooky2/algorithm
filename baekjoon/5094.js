const fs = require("fs");
const n = parseInt(fs.readFileSync("/dev/stdin").toString().trim(), 10);

const cache = { 1: 3 };
let i = 1;

while (cache[i] <= n) {
  i++;
  cache[i] = cache[i - 1] * 2 + (i + 2);
}

console.log(cache[i - 1] + i + 2 + cache[i - 1]);
console.log(cache);
