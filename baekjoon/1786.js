// 찾기 : kmp, 문자열
const [t, p] = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const answer = [];
// 실패 함수
const getPi = function (str) {
  let len = str.length;
  let j = 0;
  const pi = new Array(len).fill(0);

  // 1부터 시작하는 이유 : p[0] = 0(1이 아님에 주의)
  for (let i = 1; i < len; i++) {
    // j 값을 줄이는 과정. 즉, prefix와 suffix의 최대 개수를 찾기 위해 대조 문자열을 뒤로 당긴다
    // 한 칸씩 밀어도 되지만(j--), 이미 앞에서 구해 놓은 값을 이용하여 영리하게 당기면 더 효율적이 된다!
    while (j > 0 && str[i] !== str[j]) {
      j = pi[j - 1];
    }
    // 이전의 pi 값 활용(dp)
    // 위에서 다음 비교할 글자가 같지 않았을 경우에, j를 감소시켜 비교할 문자를 줄였다
    // 즉, 대조 문자열을 뒤로 당긴 후에 다음 비교할 글자를 비교한다
    // 같다면, 당긴 후의 pi 값 + 1
    // 같지 않다면, 0
    if (str[i] === str[j]) {
      pi[i] = ++j;
    }
  }
  return pi;
};

let j = 0;
const pi = getPi(p);
console.log(pi);
for (let i = 0; i < t.length; i++) {
  // 실제로 비교할 때도, pi 배열을 참고하여 대조 문자열을 뒤로 당김
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

// ABZZABD
// ABZZABA

// pi 배열 : 찾을 문자열 p를 1..n(index + 1)만큼 slice 할 때, prefix와 suffix가 최대로 같아질 때의 prefix 길이를 저장하는 배열

// 문자열 문제에서 trim()을 사용해도 되는지 주의할 것

// kmp를 이용하여 O(nm)을 O(n + m)으로 해결할 수 있음(워드프로세서 찾기 문제)
// https://bowbowbow.tistory.com/6
// https://blog.encrypted.gg/1040
