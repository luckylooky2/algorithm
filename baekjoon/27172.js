// 수 나누기 게임 : 소수, 에라토스테네스의 체, 정수론
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const cards = input.shift();
const biggest = cards
  .slice()
  .sort((a, b) => a - b)
  .at(-1);
const count = new Array(biggest + 1).fill(0);
const isValid = new Array(biggest + 1).fill(null);
const answer = [];

for (const number of cards) {
  const yaksu = [];
  const sqrt = Math.sqrt(number);
  for (let i = 1; i <= sqrt; i++) {
    if (number % i === 0) {
      yaksu.push(i);
      count[i]++;

      if (number / i !== i) {
        yaksu.push(number / i);
        count[number / i]++;
      }
    }
  }
  isValid[number] = yaksu;
}

for (let i = 0; i < cards.length; i++) {
  const number = cards[i];
  const yaksus = isValid[number].sort((a, b) => a - b);

  let cnt = 0;
  for (const yaksu of yaksus) {
    if (isValid[yaksu]) {
      cnt++;
    }
  }
  answer.push(count[number] - cnt);
}

console.log(answer.join(" "));
