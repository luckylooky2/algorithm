// 오아시스 재결합 : 스택
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => Number(v));
const n = input.shift();
// 2. 시간 초과 해결 : 중복 개수를 처리하기 위한 묶기
let stack = [[input[0], 1]];
let answer = 0;

// w/ stack
for (let i = 1; i < n; i++) {
  const curr = input[i];
  // curr보다 큰 것이 나올 때까지 개수 세기
  let count = 0;
  // 왼쪽에 있는 큰 수를 찾기 위해서는 어쩔 수 없이 반복문을 돌아야 함
  // - 셀 필요가 없는 원소는 제외하여 시간을 줄임 : 시작과 끝이 최소한 현재 원소와 같아야 하기 때문에 현재 원소보다 낮은 스택의 원소는 제외
  // - 동일 원소 묶음 : 위에서 작은 수는 제외했지만, 현재와 같은 수는 고려하지 않음. 같은 수가 계속될 경우 스택이 길어지는 현상 발생
  for (let j = stack.length - 1; j >= 0; j--) {
    if (curr < stack[j][0]) {
      count++;
      break;
    } else {
      count += stack[j][1];
    }
  }
  answer += count;
  // curr보다 작은 원소 pop
  // 1. 시간 초과 해결 : 더 이상 필요 없는 원소 pop
  while (stack.length && stack[stack.length - 1][0] < curr) {
    stack.pop();
  }
  if (stack.length && stack[stack.length - 1][0] === curr) {
    stack[stack.length - 1][1]++;
  } else {
    stack.push([curr, 1]);
  }
}

console.log(answer);

// w/o stack : 시간 초과
// for (let i = 1; i < n; i++) {
//   const curr = input[i];
//   const prev = input[i - 1];
//   if (curr < prev) {
//     answer += 1;
//   } else {
//     let count = 0;
//     let max = 0;
//     for (let j = i - 1; j >= 0; j--) {
//       if (curr >= input[j]) {
//         if (input[j] < max) continue;
//         count++;
//         max = Math.max(max, input[j]);
//       } else {
//         count++;
//         break;
//       }
//     }
//     answer += count;
//   }
// }

// console.log(answer);

// [10, 9, 1, 3, 8, 6, 7, 8, 5, 8]

// 풀이 방법
// 1. 가능한 경우의 수를 모두 모은 뒤 적절하게 묶어서 반복적인 로직을 만들자
// [10, 9]
// [9, 1]
// [1, 3], [9, 3]
// [3, 8], [9, 8]
// [8, 6]
// [6, 7], [8, 7]
// [7, 8], [8, 8], [9, 8]
// [8, 5]
// [8, 8], [8, 8], [9, 8], [5, 8]

// 2. 스택의 특징을 파악하고 적용해본다
// - 스택을 사용하는 이유는 지금까지 확인했던 정보를 유효한 형태로 갖고 있기 위함입니다. 크기가 커지는 순서대로 혹은 작아지는 순서대로 말이죠. 그러다가 새로운 값을 입력받으면 스택에서 조건에 맞을 때까지 원소를 꺼내면서 연산을 처리합니다.
// - 또한, 원소를 제외하는 것이 가장 최근에 추가했던 원소일 때를 가정한다. 즉, 여기서는 앞 사람을 확인하고 그 앞 사람을 확인하는 순서가 정해져 있으므로 스택을 사용한다
// - 위에서 말한 유효한 형태란 스택을 살펴볼 때 모든 원소가 모두 존재한다면 O(n^2)가 될 것이므로 필요없는 정보는 제외하고 필요한 정보만 스택에 담아 효율적으로 계산한다는 의미이다.

// 3. 원래는 O(n^2)이지만, 최적화를 통해 시간을 줄인다
// - 스택에 유효하지 않은 정보는 pop(현재 값보다 작은 원소)
// - 같은 값끼리는 묶음(현재 값와 동일한 원소)
