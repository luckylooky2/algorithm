const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v, 10));
let n = input[0];
let r = input[1];
let arr = [];
let result = [];

function checkRepeat(result, number, count) {
  // 마지막에 추가한 것 이전까지 비교
  for (let i = 0; i < count; i++) {
    if (result[i] === number) return true;
  }
  return false;
}

function permutation(s = 0, depth = 0) {
  result[depth] = s;

  // 중복이 있으면 return
  if (depth > 1 && checkRepeat(result, s, depth)) return;

  if (depth === r) {
    arr.push(result.filter((v, i) => i !== 0).join(" "));
    return;
  }

  for (let i = 1; i <= n; i++) {
    permutation(i, depth + 1);
  }
}

permutation();

// 출력 시간 차이 떄문에 발생 : 매번 출력 vs. 저장 후 한 번에 출력
console.log(arr.join("\n"));

// 기반 :
// 가지치기 :

// let fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");
// let n = +input[0].split(" ")[0];
// let m = +input[0].split(" ")[1];
// let arr = [];
// let validates = [];
// function dfs(level) {
//   if (m === level) {
//     arr.push(validates.join(" "));
//     return;
//   }
//   for (let i = 1; i <= n; i++) {
//     if (validates.includes(i)) continue;
//     validates.push(i);
//     dfs(level + 1);
//     validates.pop();
//   }
// }
// dfs(0);

// console.log(arr.join("\n"));
