// 팰린드롬 만들기 : 문자열, 그리디, 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("");
const alphaCount = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .split("")
  .reduce((acc, curr) => {
    acc[curr] = 0;
    return acc;
  }, {});

for (const char of input) {
  alphaCount[char]++;
}

const validAlpha = Object.entries(alphaCount).filter((v) => v[1] > 0);
let start = 0,
  end = input.length - 1;
let isEnd = false;
let palindrome = new Array(input.length).fill("");
const fillPalindrome = function (palindrome, alpha, start, end, count) {
  for (let i = 0; i < count; i++) {
    palindrome[start + i] = alpha;
  }
  for (let i = 0; i < count; i++) {
    palindrome[end - i] = alpha;
  }
};

for (let i = 0; i < validAlpha.length; i++) {
  const [alpha, count] = validAlpha[i];

  const move = Math.floor(count / 2);
  fillPalindrome(palindrome, alpha, start, end, move);
  start += move;
  end -= move;
  if (count % 2) {
    if (!isEnd) {
      isEnd = true;
      palindrome[Math.floor((input.length - 1) / 2)] = alpha;
    } else {
      palindrome = null;
      break;
    }
  }
}

console.log(palindrome ? palindrome.join("") : "I'm Sorry Hansoo");

// palindrome
// - 홀수인 알파벳이 2개 이상이면 팰린드롬 성립 불가
// - 사전 순으로 가장 앞에 나와야 하는 조건 때문에 앞 뒤에서부터 차례대로 추가하면 됨
// - 홀수인 알파벳은 가운데에 나머지 하나를 추가
