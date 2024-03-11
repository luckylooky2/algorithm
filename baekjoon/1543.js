// 문서 검색 : 문자열, 브루트 포스
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const [str1, str2] = input;
let i = 0;
let answer = 0;

while (i < str1.length) {
  let n = i;
  let m = 0;
  if (str1[n] === str2[0]) {
    while (n < str1.length && str1[n] === str2[m]) {
      n++;
      m++;
    }
    if (m === str2.length) {
      answer++;
      i += m - 1;
    }
  }
  i++;
}

console.log(answer);

// ababc
// abc

// aaaaabaaaaa
// aaabaaa

// kmp 보다 덜 효율적인 문자열 찾기 알고리즘(브루트 포스)
// 찾기 문제(1786)를 풀 때, 처음으로 시도했던 방법
