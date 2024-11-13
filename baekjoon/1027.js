// 고층 건물 : 수학, 브루트 포스, 기하학
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const arr = input.shift();
let answer = 0;

for (let i = 0; i < arr.length; i++) {
  let count = 0;
  let maxInRange = null;
  const coordA = [i, arr[i]];
  // 앞
  for (let j = i - 1; j >= 0; j--) {
    const coordB = [j, arr[j]];
    let flag = true;
    for (let k = j + 1; k < i; k++) {
      const [targetX, targetY] = [k, arr[k]];
      const slope = (coordB[1] - coordA[1]) / (coordB[0] - coordA[0]);
      const b = coordA[1] - coordA[0] * slope;
      if (!(targetX * slope + b > targetY)) {
        flag = false;
        break;
      }
    }
    if (flag) {
      count++;
    }
  }

  // 뒤
  maxInRange = null;
  for (let j = i + 1; j < arr.length; j++) {
    const coordB = [j, arr[j]];
    let flag = true;
    for (let k = i + 1; k < j; k++) {
      const [targetX, targetY] = [k, arr[k]];
      const slope = (coordB[1] - coordA[1]) / (coordB[0] - coordA[0]);
      const b = coordA[1] - coordA[0] * slope;
      if (!(targetX * slope + b > targetY)) {
        flag = false;
        break;
      }
    }
    if (flag) {
      count++;
    }
  }
  answer = Math.max(answer, count);
}

console.log(answer);

// Try 1
// - 나눗셈 오차로 인해 답이 달라지는 것으로 오해해서 곱셈 로직으로 수정했으나 이게 문제가 아니었다.

// 나눗셈 로직
// const slope = (coordB[1] - coordA[1]) / (coordB[0] - coordA[0]);
// const b = coordA[1] - coordA[0] * slope;
// if (!(targetX * slope + b > targetY))

// 곱셈 로직
// const [targetX, targetY] = [k, arr[k]];
// const [dx, dy] = [coordB[0] - coordA[0], coordB[1] - coordA[1]];
// if (!(dx * (targetY - coordA[1]) > dy * (targetX - coordA[0])))

// Try 2
// - maxInRange를 이용하여 시간 복잡도를 줄이려고 했던 것이 문제였다.
// - 하나의 경우가 나머지 경우를 대표하지 못하기 때문에 대표값을 사용하면 안 된다.
// - 더구나 n = 15 밖에 안 되기 때문에 시간 복잡도를 고려할 필요도 없었다.
