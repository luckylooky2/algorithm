// 전화번호 목록 : 트라이, 문자열, 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let t = Number(input[0]);
let totalIndex = 1;
const answer = [];

while (t-- > 0) {
  const n = Number(input[totalIndex++]);
  let flag = false;
  const numbers = input.slice(totalIndex, totalIndex + n);
  totalIndex += n;

  const sorted = numbers.sort();
  for (let i = 0; i < sorted.length - 1; i++) {
    const base = sorted[i];
    const toCompare = sorted[i + 1];
    if (base === toCompare.slice(0, base.length)) {
      flag = true;
      break;
    }
  }

  answer.push(flag ? "NO" : "YES");
}

console.log(answer.join("\n"));

// [ 1234, 1235, 12340 ]
// - 1) 길이로 정렬한 경우 => [ 1234, 1235, 12340 ]
// - 2) 그냥 문자열 정렬한 경우 => [ 1234, 12340, 1235 ]
// - 길이로 정렬하면, 브루트 포스로 모든 경우를 확인할 수 밖에 없음
// - 문자열 정렬하면, 다음 인덱스의 문자열만 확인하면 됨!

// 브루트 포스에서 앞 자리가 같은 경우의 수를 한 번 묶는 과정을 추가하면 2배 이상 빨라짐(3800ms -> 1700ms)
