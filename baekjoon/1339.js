// 단어 수학 : 그리디, 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = Number(input.shift());
const words = input;

// ver.2
const values = {};

for (const word of words) {
  const letters = word.split("");
  let base = 1;
  for (let i = letters.length - 1; i >= 0; i--, base *= 10) {
    const letter = letters[i];
    if (values[letter] === undefined) {
      values[letter] = 0;
    }
    values[letter] += base;
  }
}

let answer = 0;
let currValue = 9;
const sorted = Object.entries(values)
  .map((v) => v[1])
  .sort((a, b) => b - a);
for (let i = 0; i < sorted.length; i++, currValue--) {
  answer += sorted[i] * currValue;
}

console.log(answer);

// ver.1 : 앞에서부터 처음 나오는 알파벳에 9, 8, 7 ... 을 할당하는 방식
// 알파벳에 숫자를 할당 => 자리가 겹치면 우선수위에 따라 숫자를 할당
// 2가지 조건, 우선순위
// - 1) col 중에 이미 할당된 값 중 가장 큰 인덱스
// - 2) 없다면, candidates 중에 가장 먼저 나오는 인덱스

// 같은 그리디 방식의 ver.2보다 훨씬 복잡함
// 거꾸로 생각하여 우선순위를 제거하는 방식으로 찾는 것이 아니라 쌓아가는 방식으로 찾자
// 특정 글자보다 뒤에 나온다면, 여기서는 10배 큰 가중치가 적용됨 => 자리 수마다 10배씩 커지는 가중치를 부여
// 각 글자의 가중치의 합을 정렬하여 가장 큰 순서대로 9, 8, 7 ... 을 부여
