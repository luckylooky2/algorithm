// 집으로 : 기하학, 애드 혹, 많은 조건 분기
const [x, y, d, t] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => Number(v));
const minLength = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

let cnt = 0;
let answer = minLength;
let rest = minLength;

while (true) {
  if (rest > 0) {
    // 삼각형 되는지? 두 변의 길이의 합이 다른 한 변보다 반드시 길어야 한다
    if (d * 2 > rest) {
      answer = Math.min(answer, t * (cnt + 2));
    }
    answer = Math.min(answer, t * cnt + rest);
  } else if (rest === 0) {
    answer = Math.min(answer, cnt * t);
  } else {
    // 마지막으로 음수가 되었을 때도 한 번 계산
    answer = Math.min(answer, cnt * t + Math.abs(d - minLength));
    break;
  }
  cnt++;
  rest = minLength - cnt * d;
}

console.log(answer);

// 문제 이해도가 낮았음

// 예제 6번: 10 10 1000 5
// - 어떻게 10이 나올 수 있는가?
// - 걸어서 가는 시간보다, 한 번 점프해서 가는 시간이 더 짧을 수 있다는 개념이 중요
