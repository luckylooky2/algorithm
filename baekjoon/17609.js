// 회문 : 투 포인터
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const n = +input.shift();
const strings = input;
const [PALINDROME, PSEUDO, OTHER] = [0, 1, 2];
const answer = [];

function solve(string, start, end) {
  while (start < end) {
    if (string[start] === string[end]) {
      start++;
      end--;
    } else {
      return false;
    }
  }

  return true;
}

// 30
for (const string of strings) {
  // 100_000
  const chars = string.split("");
  let [s, e] = [0, chars.length - 1];
  let flag = true;

  while (s <= e) {
    if (chars[s] === chars[e]) {
      s++;
      e--;
    } else {
      // 2가지 경우의 수가 있음
      // 1. s++
      // 2. e--
      if (solve(chars, s + 1, e) || solve(chars, s, e - 1)) {
        answer.push(PSEUDO);
      } else {
        answer.push(OTHER);
      }
      flag = false;
      break;
    }
  }
  if (flag) {
    answer.push(PALINDROME);
  }
}

console.log(answer.join("\n"));

// 하나를 삭제하는 방법: 최대 100_000개
// 팰린드롬인지? O(n)
// 유사 팰린드로롬인지?

// c o c m c c m o c
//     s       e
//     s     e
