// Fly me to the Alpha Centauri : 수학
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = Number(input.shift());
const arr = [];
const answer = [];
arr[1] = 1;
arr[2] = 2;
arr[3] = 3;

for (const elem of input) {
  const [start, end] = elem.split(" ").map((v) => Number(v));
  let diff = end - start;
  if (diff === 1) {
    answer.push(1);
    continue;
  }
  let i = 2;
  let double = i * i;
  let count = 3;
  let prev = 1;
  while (double < diff) {
    arr[double] = count;
    prev = double;
    i++;
    count += 2;
    double = i * i;
  }
  const half = (double - prev - 1) / 2;
  if (prev + half >= diff) {
    answer.push(count - 1);
  } else {
    answer.push(count);
  }
}

console.log(answer.join("\n"));

// 1) 가장 앞과 뒤는 1로 고정 : 1 ... 1
// 2) 각각의 숫자는 앞뒤로 차이가 반드시 -1, 0, 1이어야 한다 : 1 2 2 1 2 1
// 3) 계단수는 n의 제곱의 최적화된 개수이다 : 1 2 3 4 3 2 1 => 16
// 4) 제곱수마다 count가 2 증가(새로운 수 1개 + 이전 수 1개)한다
// 5) 제곱 수 사이의 범위는 두 영역으로 나눌 수 있고 앞의 영역은 작은 제곱수의 결과값 + 1, 뒤의 영역은 큰 제곱수의 결과값과 같다
