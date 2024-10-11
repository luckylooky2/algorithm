// 단어 만들기 : 구현, 문자열
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
let idx = 0;
const dict = new Map();
const answer = [];

function getAlphaMap(string) {
  return string.split("").reduce((acc, curr) => {
    if (acc.get(curr) === undefined) {
      acc.set(curr, 1);
    } else {
      acc.set(curr, acc.get(curr) + 1);
    }
    return acc;
  }, new Map());
}

function compare(map1, map2, count) {
  // map1: 비교할 것
  const list = [...map1];
  const result = [];
  for (const [char, count1] of list) {
    const count2 = map2.get(char);
    if (count2 === undefined) {
      return false;
    } else {
      if (count2 < count1) {
        return false;
      } else {
        result.push(char);
      }
    }
  }
  for (const char of result) {
    if (count.get(char) === undefined) {
      count.set(char, 1);
    } else {
      count.set(char, count.get(char) + 1);
    }
  }
  return true;
}

// 사전 Map 만들기: O(n)
for (; idx < input.length; idx++) {
  const curr = input[idx];
  if (curr === "-") {
    idx++;
    break;
  }
  dict.set(curr, getAlphaMap(curr));
}

const dictList = [...dict];

// 각 퍼즐에 대해서 순회 O(m)
for (; idx < input.length; idx++) {
  const currPuzzle = input[idx];
  if (currPuzzle === "#") {
    break;
  }

  const puzzleAlpha = getAlphaMap(currPuzzle);
  const count = [...puzzleAlpha].reduce((acc, [char]) => {
    acc.set(char, 0);
    return acc;
  }, new Map());

  // puzzleAlpha(기준)와 wordAlpha 비교: O(n * 10)
  for (let i = 0; i < dictList.length; i++) {
    const [_word, wordAlpha] = dictList[i];
    compare(wordAlpha, puzzleAlpha, count);
  }

  // 정리
  const sorted = [...count].sort((a, b) => b[1] - a[1]);
  const [max, min] = [sorted[0][1], sorted[sorted.length - 1][1]];
  const [maxChar, minChar] = [[], []];

  for (const [char, count] of sorted) {
    if (count === max) {
      maxChar.push(char);
    }
    if (count === min) {
      minChar.push(char);
    }
  }

  answer.push(`${minChar.sort().join("")} ${min} ${maxChar.sort().join("")} ${max}`);
}

console.log(answer.join("\n"));

// Map을 spread할 일이 많아서 Object보다 Map을 사용
