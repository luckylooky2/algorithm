// 리모컨 : 브루트 포스, 깊이 우선 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [targetChannel] = input.shift();
const [brokenButtonNum] = input.shift();
const brokenButtons = brokenButtonNum === 0 ? [] : input.shift();
const pressableButtons = [0];
let flag = false;
let currChannel = 100;
// +, -로만 움직인 횟수
let answer = Math.abs(targetChannel - currChannel);

if (brokenButtons.includes(0)) {
  flag = true;
}

for (let i = 1; i <= 9; i++) {
  if (!brokenButtons.includes(i)) {
    pressableButtons.push(i);
  }
}

pressableButtons.sort((a, b) => a - b);

const targetChannelLength = String(targetChannel).split("").length + 1;

function dfs(targetChannel, targetChannelLength, visited = [], depth = 0) {
  // 목표 채널 자리수 + 1까지 탐색
  if (depth === targetChannelLength) {
    const curr = Number(visited.join(""));
    const diff = Math.abs(curr - targetChannel);
    let pressedButtonCount = visited.length;
    const trimmed = String(curr).split("");
    // 고장난 버튼에 0이 존재하고, 0이 중간에 들어가 있으면 제외
    if (flag && trimmed.includes("0")) {
      return;
    }
    // 앞에 0으로 채워진 경우, 앞의 연속된 0을 제외
    if (pressedButtonCount !== trimmed.length) {
      pressedButtonCount = trimmed.length;
    }
    answer = Math.min(answer, diff + pressedButtonCount);
    return;
  }

  for (const button of pressableButtons) {
    visited.push(button);
    dfs(targetChannel, targetChannelLength, visited, depth + 1);
    visited.pop();
  }
}

dfs(targetChannel, targetChannelLength);

console.log(answer);

// DFS를 사용한 완전 탐색
// - 고장난 버튼을 제외한 버튼들을 중복으로 사용하는 조합의 수
// - 목표 채널의 자리수보다 한 자리 큰 수까지 탐색(빼는 방향도 같이 탐색)
// - 예를 들어, 5자리까지 검사해야 하는데 아랫 자리들(1 ~ 4)도 같이 검사해야 하므로 [0, 0, 0, 1, 2]와 같이 0이 반드시 필요
// - 따라서 0이 제외된 경우에도 조합에 0을 포함시키고, 중간에 0이 들어가는 경우를 제외하는 방법으로 최고 자리수를 맞춤
