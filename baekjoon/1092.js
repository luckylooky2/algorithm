// 배 : 그리디, 정렬, 투 포인터
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [[cranesLength], cranes, [boxesLength], boxes] = input;
const sortedBoxes = boxes.sort((a, b) => b - a);
const sortedCranes = cranes.sort((a, b) => b - a);
let answer = 0;
let total = sortedBoxes.length;

while (true) {
  let sum = 0;
  let [cranePointer, boxPointer] = [0, 0];
  while (cranePointer < cranesLength && boxPointer < boxesLength) {
    if (sortedCranes[cranePointer] >= sortedBoxes[boxPointer]) {
      sortedBoxes[boxPointer] = Infinity;
      cranePointer++;
      sum++;
    }
    boxPointer++;
  }

  if (sum) {
    total -= sum;
    answer++;
  } else {
    break;
  }
}

console.log(total ? -1 : answer);
