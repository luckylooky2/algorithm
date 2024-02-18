// 소수의 연속합 : 투 포인터, 소수, 수학
const n = Number(require("fs").readFileSync("/dev/stdin").toString().trim());
const getPrimeNumbers = function (max) {
  let ret = [];

  for (let i = 2; i <= max; i++) {
    let flag = true;
    for (let prime of ret) {
      if (prime * prime > i) {
        break;
      }

      if (i % prime === 0) {
        flag = false;
        break;
      }
    }
    if (flag) {
      ret.push(i);
    }
  }

  return ret;
};
const primeNumbers = getPrimeNumbers(4000000);
let answer = 0;
let start = 0,
  end = 0;
let total = primeNumbers[start];

while (start <= end && end < primeNumbers.length) {
  if (total > n) {
    total -= primeNumbers[start];
    start++;
  } else {
    if (total === n) {
      answer++;
      if ((start === end && start > 0) || n === 2) {
        break;
      }
    }
    end++;
    total += primeNumbers[end];
  }
}

console.log(answer);
