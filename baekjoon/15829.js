// Hashing : 문자열
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n] = input.shift();
const convertObj = "abcdefghijklmnopqrstuvwxyz"
  .split("")
  .reduce((acc, curr, index) => {
    acc[curr] = index + 1;
    return acc;
  }, {});
const strArr = input
  .shift()
  .split("")
  .map((v) => convertObj[v]);
let mod = 1234567891;
let r = 1;

const answer = strArr.reduce((acc, curr) => {
  acc += (curr * r) % mod;
  r = (r * 31) % mod;
  return acc % mod;
}, 0);

console.log(answer);
