// 잠수함식별 : 정규 표현식
const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const regex = new RegExp(/^(100+1+|01)+$/g);

// ^(100+1+|01)+ : 오답
// ^ : 최소 1번이 아니라 "문자열의 시작"을 의미
// $ : "문자열의 끝"을 의미
console.log(regex.test(input) ? "SUBMARINE" : "NOISE");

// 1.
// ^(100+1+|01)+$는 문자열의 전체가 패턴과 일치해야 함
// - 문자열의 처음부터 끝까지 검사하여 일치하지 않는 부분이 있으면 매칭되지 않음

// 2.
// ^(100+1+|01)+는 문자열의 시작 부분이 패턴과 일치하는지만 검사
// - 문자열의 시작부터 패턴이 일치하면 매칭되고, 그 이후의 문자열은 검사하지 않음

// 3.
// (100+1+|01)+는 문자열의 중간 부분이 패턴과 일치하는지 검사
// - 문자열의 시작과 끝이 패턴과 일치하지 않아도 패턴을 찾음
