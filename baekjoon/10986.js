// 나머지 합 : 누적 합
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, m] = input.shift();
const nums = input.shift();
// 배열로 저장할 필요가 없음
let prefixSum = 0;
let answer = 0;
// 굳이 Object로 할 필요 없음
const countRemainder = new Array(m).fill(0);

for (let i = 1; i <= n; i++) {
  prefixSum += nums[i - 1];
  const remainder = prefixSum % m;

  // 이전까지 같은 나머지가 나온 개수를 더함
  answer += countRemainder[remainder];
  // 개수 업데이트
  if (remainder === 0) {
    countRemainder[remainder]++;
    // 현재 나누어 떨어지는 경우
    answer++;
  } else {
    countRemainder[remainder]++;
  }
}

console.log(answer);
