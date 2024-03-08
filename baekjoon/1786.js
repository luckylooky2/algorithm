// 찾기 : kmp, 문자열
const [t, p] = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const answer = [];
const getPi = function (str) {
  let len = str.length;
  let j = 0;
  const pi = new Array(len).fill(0);

  for (let i = 1; i < len; i++) {
    while (j > 0 && str[i] !== str[j]) {
      j = pi[j - 1];
    }
    if (str[i] === str[j]) {
      pi[i] = ++j;
    }
  }
  return pi;
};

let j = 0;
const pi = getPi(p);
for (let i = 0; i < t.length; i++) {
  while (j > 0 && t[i] !== p[j]) {
    j = pi[j - 1];
  }
  if (t[i] == p[j]) {
    if (j === p.length - 1) {
      answer.push(i - p.length + 1);
      j = pi[j];
    } else {
      j++;
    }
  }
}

console.log(answer.length);
console.log(answer.map((v) => v + 1).join(" "));

// pi 배열 : 찾을 문자열 p를 1..n(index + 1)만큼 slice 할 때, prefix와 suffix가 최대로 같아질 때의 prefix 길이를 저장하는 배열

// 문자열 문제에서 trim()을 사용해도 되는지 주의할 것

// kmp를 이용하여 O(nm)을 O(n + m)으로 해결할 수 있음(워드프로세서 찾기 문제)
// https://bowbowbow.tistory.com/6

// try 1
// const [t, p] = require("fs")
//   .readFileSync("/dev/stdin")
//   .toString()
//   .trim()
//   .split("\n");
// let i = 0;
// const answer = [];

// while (i < t.length) {
//   const curr = t[i];
//   if (curr === p[0]) {
//     i++;
//     let j = 1;
//     let k = 0;
//     while (i < t.length) {
//       if (t[i] !== p[j]) {
//         if (p[k] === t[i]) {
//           j = k + 1;
//           k = 0;
//         } else {
//           j = 0;
//           k = 0;
//         }
//         i++;
//         continue;
//       }
//       if (p[j] === p[k] && j > 0) {
//         k++;
//       } else {
//         k = 0;
//       }
//       i++;
//       j++;
//       if (j === p.length) {
//         answer.push(i - p.length);
//         j = k;
//         k = 0;
//         continue;
//       }
//     }
//   } else {
//     i++;
//   }
// }

// console.log(answer.length);
// console.log(answer.map((v) => Number(v) + 1).join(" "));
