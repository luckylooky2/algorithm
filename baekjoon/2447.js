// for 반복문 ver.
// const fs = require("fs");
// const input = parseInt(fs.readFileSync("/dev/stdin").toString().trim(), 10);

// // 지수 승수 구하기
// const n = Math.log(input) / Math.log(3);

// const final = [];
// let flag = 0;

// for (let i = 0; i < Math.pow(3, n); i++) {
//   let arr = [];
//   for (let j = 0; j < Math.pow(3, n); j++) {
//     // 승수로 나눠야 하는 부분 : 재귀로 바꿀 수 있음
//     for (let k = 0; k < n; k++) {
//       flag = 0;
//       if (
//         Math.floor(i / Math.pow(3, k)) % 3 === 1 &&
//         Math.floor(j / Math.pow(3, k)) % 3 === 1
//       ) {
//         arr.push(" ");
//         flag = 1;
//         break;
//       }
//     }
//     if (flag === 0) arr.push("*");
//   }
//   final.push(arr);
// }

// console.log(final.map((v) => v.join("")).join("\n"));

// 재귀 호출 ver.
const fs = require("fs");
const input = parseInt(fs.readFileSync("/dev/stdin").toString().trim(), 10);

// while 문을 도는 방법이 덜 번거롭긴 한 듯
const result = Math.log(input) / Math.log(3);
const tolerance = 1e-9;
const n = result - Math.floor(result) < tolerance ? Math.floor(result) : -1;
if (n == -1) {
  console.log("Wrong argument");
  process.exit();
}

const final = [];

function checkAndPush(i, j, depth, arr) {
  if (
    Math.floor(i / Math.pow(3, depth)) % 3 === 1 &&
    Math.floor(j / Math.pow(3, depth)) % 3 === 1
  ) {
    arr.push(" ");
  } else {
    // push *
    if (depth === n) arr.push("*");
    // 재귀 호출
    else checkAndPush(i, j, depth + 1, arr);
  }
}

for (let i = 0; i < input; i++) {
  let arr = [];
  for (let j = 0; j < input; j++) {
    checkAndPush(i, j, 0, arr);
  }
  final.push(arr);
}

console.log(final.map((v) => v.join("")).join("\n"));
