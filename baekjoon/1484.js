// 다이어트 : 수학, 투 포인터
const g = Number(require("fs").readFileSync("/dev/stdin").toString().trim());
const divisors = [];
const sortFunction = (a, b) => a - b;
let answer = [];

for (let i = 1; i <= Math.floor(Math.sqrt(g)); i++) {
  if (g % i === 0) {
    divisors.push(i);
    if (i !== g / i) {
      divisors.push(g / i);
    }
  }
}
divisors.sort(sortFunction);

const divisorsLength = divisors.length;

for (let i = 0; i < Math.floor(divisorsLength / 2); i++) {
  const minus = divisors[i];
  const plus = divisors[divisorsLength - 1 - i];
  const x = (minus + plus) / 2;
  const y = x - minus;
  if (x % 1 === 0 && y % 1 === 0) {
    answer.push(x);
  }
}

const sorted = answer.sort(sortFunction);
console.log(sorted.length ? sorted.join("\n") : -1);

// (x - y) * (x + y) = 15
// 1. 약수 배열 구하기: 에라토스테네스
// 2. 약수 배열을 순회하며 x, y가 자연수인지 확인
// 3. 가능하면 answer에 push
