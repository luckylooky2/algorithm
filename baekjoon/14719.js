// 빗물 : 구현, 시뮬레이션
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [h, w] = input[0];
const arr = input[1];
const stack = [arr[0]];
let idx = 1;
let complete = [];
let incomplete = 0;

while (idx < arr.length) {
  const curr = arr[idx];
  // 확실히 기준보다 큰 것이 나타나면 그 이전은 볼 필요가 없기 때문에 stack에서 pop
  if (curr >= stack[0]) {
    // 양쪽 끝 중 작은 것으로
    const min = Math.min(stack[0], curr);
    let sum = 0;
    while (stack.length) {
      sum += min - stack.pop();
    }
    complete.push(sum);
    incomplete = 0;
    // 기준보다 작다면 스택에 값을 계속 저장
    // - why? 100 0 50 은 한 칸만 계산하면, 되지만 뒤에 더 큰 것이 나오면(100 0 50 0 90) 앞의 것을 다시 계산해주어야 하기 때문이다.
  } else {
    if (stack[stack.length - 1] <= curr) {
      let start = stack.length - 1;
      let sum = 0;
      let crit = curr;
      // 끝부터 처음까지 돌면서 기준을 가장 큰 벽으로 하고 물의 양을 계산한다
      while (start >= 0) {
        crit = Math.max(crit, stack[start]);
        sum += crit - stack[start];
        start--;
      }
      incomplete = Math.max(incomplete, sum);
    }
  }
  stack.push(curr);
  idx++;
}

console.log(incomplete + complete.reduce((acc, curr) => acc + curr, 0));

// 더 간단한 ver.

// 특정 칸에 빗물이 고이려면 그 칸의 왼쪽과 오른쪽에 있는 블록 중 가장 높은 블록의 높이가 기준이 된다.
// - 즉, 현재 위치에 고일 수 있는 빗물의 양은 그 칸의 오니쪽에서 가장 높은 블록과 오른쪽에서 가장 높은 블록 중 작은 값에서 현재 블록을 뺀 값이다.

// let answer = 0;

// // 양 끝은 미포함
// for (let i = 1; i < arr.length - 1; i++) {
//   const curr = arr[i];
//   let [left, right] = [0, 0];
//   let [leftIdx, rightIdx] = [i - 1, i + 1];
//   while (leftIdx >= 0) {
//     left = Math.max(left, arr[leftIdx]);
//     leftIdx--;
//   }
//   while (rightIdx < arr.length) {
//     right = Math.max(right, arr[rightIdx]);
//     rightIdx++;
//   }
//   answer += Math.max(Math.min(left, right) - curr, 0);
// }

// console.log(answer);
