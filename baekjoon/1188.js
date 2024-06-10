// 음식 평론가 : 수학, 유클리드 호제법
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => Number(v));
let [n, m] = input;
let answer = 0;

(function () {
  while (true) {
    if (n >= m) {
      const quotinent = Math.floor(n / m);
      n -= m * quotinent;
    }

    if (n === 0) {
      return console.log(answer);
    } else if (n === 1) {
      return console.log(answer + (m - 1));
    } else {
      m -= n;
      answer += n;
    }
  }
})();
