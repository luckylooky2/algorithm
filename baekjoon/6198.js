// 옥상 정원 꾸미기 : 스택
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => Number(v));
const n = input.shift();
const buildings = input;
const stack = [];
let answer = 0;

for (let building of buildings) {
  while (stack.length && stack[stack.length - 1] <= building) {
    stack.pop();
  }
  stack.push(building);
  answer += stack.length - 1;
}

console.log(answer);

// 1) 각 빌딩에서의 개수를 나머지를 반복문을 돌며 각각 구하는 것이 아니라
// 2) 현재 빌딩보다 낮은 빌딩을 스택에서 모두 꺼낸 뒤, 현재 빌딩을 스택에 푸시하는 방법을 이용
// 즉, 각 빌딩을 볼 수 있는 빌딩의 수(스택 가장 꼭대기에 있는 숫자를 볼 수 있는 빌딩의 수)로 접근하는 방법
// 문제 접근을 반대로 해보는 연습이 필요할 듯...
// 10, 3, 7, 4, 12, 2
// [10]
// [10, 3]
// [10, 7]
// [10, 7, 4]
// [12]
// [12, 2]
