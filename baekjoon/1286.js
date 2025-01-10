// 부분 직사각형 : 수학, 조합
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const [row, col] = input.shift().split(" ").map(Number);
const [drow, dcol] = [row * 2, col * 2];
const map = input.map((v) => v.split(""));
const charMap = new Array(drow).fill(null).map(() => new Array(dcol).fill(0));

for (let i = 0; i < charMap.length; i++) {
  for (let j = 0; j < charMap[i].length; j++) {
    charMap[i][j] = map[i % row][j % col];
  }
}

const count = charMap.map((v) => v.slice().fill(0));
const answer = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").reduce((acc, curr) => {
  acc[curr] = 0;
  return acc;
}, {});

for (let i = 0; i < count.length; i++) {
  for (let j = 0; j < count[i].length; j++) {
    const [colCount, rowCount] = [(dcol - j) * (j + 1), (drow - i) * (i + 1)];
    count[i][j] = colCount * rowCount;
    answer[charMap[i][j]] += count[i][j];
  }
}

console.log(Object.values(answer).join("\n"));

// col 6칸: ......
// 첫 번째 col을 포함하는 직사각형: 6(6 * 1)
// 두 번째 col을 포함하는 직사각형: 10(5 * 2) = 두 번째 col 시작 직사각형(5) + 첫 번째 col 시작 직사각형(5)
// 세 번째 col을 포함하는 직사각형: 12(4 * 3) = 세 번째 col 시작 직사각형(4) + 두 번째 col 시작 직사각형(4) + 첫 번째 col 시작 직사각형(4)
// ...

// row도 마찬가지로 적용

// row와 col은 서로 독립적이다.
// - row의 개수를 구하고 가능한 col의 경우의 수를 곱한다.
