// 카드 : 정렬
const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  // BigInt 배열
  .map((v) => BigInt(v));
const n = arr.shift();
// BigInt sort
const sorted = arr.sort((a, b) => {
  if (a > b) return 1;
  else if (a < b) return -1;
  else return 0;
});
let currValue = BigInt(arr[0]);
let currCount = 1;
let answerValue = -Infinity;
let answerCount = -Infinity;

for (let i = 1; i < sorted.length; i++) {
  if (BigInt(sorted[i]) === currValue) currCount++;
  else {
    if (currCount > answerCount) {
      answerCount = currCount;
      answerValue = currValue;
    }
    currValue = BigInt(sorted[i]);
    currCount = 1;
  }
}

// 값이 변할 때 answer count를 바꿔줬기 때문에, 마지막 값은 바뀌지 않을 것이므로 마지막에 한 번 더 실행
if (currCount > answerCount) {
  answerCount = currCount;
  answerValue = BigInt(currValue);
}

console.log(String(answerValue));
