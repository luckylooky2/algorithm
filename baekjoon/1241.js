// 머리 톡톡 : 수학, 정수론, 소수
const numbers = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => +v);
const n = numbers[0];
const answer = [];
const cache = new Map();
const countMap = new Map();

for (let i = 1; i <= n; i++) {
  const num = numbers[i];
  countMap.set(num, (countMap.get(num) || 0) + 1);
}

function 약수리스트(num) {
  const list = [];
  const root = Math.floor(Math.sqrt(num));
  for (let i = 1; i <= root; i++) {
    if (num % i === 0) {
      list.push(i);
      if (i !== num / i) {
        list.push(num / i);
      }
    }
  }

  return list.sort((a, b) => a - b);
}

// Try 1: 각각을 돌면서 약수를 구하고, 그 약수의 개수를 구하는 것이다.
// - 약수를 최대 logn에 구해야 한다. 약수를 한 번씩 순회해야 하기 때문에 꽤 부담이 될 수 있다.
// - 최대 100_000까지 개당 최대 Math.sqrt(1_000_000) = 1000 번을 수행하면 되기 때문에 모든 수의 약수를 시간 내에 구할 수 있다.
// - 최대 약수의 개수(1000 * 2 = 2000): 100_000개에 대해 각각 적용해도 최대 0.2초임으로 시간 제한에 걸리지 않는다.
for (let i = 1; i <= n; i++) {
  const num = numbers[i];
  if (cache.has(num)) {
    answer.push(cache.get(num));
    continue;
  }

  let count = 0;
  const divisors = 약수리스트(num);
  for (const divisor of divisors) {
    count += countMap.get(divisor) || 0;
  }
  answer.push(count - 1);
  cache.set(num, count - 1);
}

console.log(answer.join("\n"));
