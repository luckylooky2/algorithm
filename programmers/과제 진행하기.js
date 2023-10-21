// 과제 진행하기 : 스택, 정렬
function calculateDiff(from, to) {
  const fromMin = from[0] * 60 + from[1];
  const toMin = to[0] * 60 + to[1];
  return toMin - fromMin;
}

function solution(plans) {
  var answer = [];
  const stack = [];
  const now = [];
  const sorted = plans
    .map((v) => [
      v[0],
      v[1].split(":").map((v) => parseInt(v, 10)),
      parseInt(v[2], 10),
    ])
    .sort((a, b) => {
      if (a[1][0] !== b[1][0]) return a[1][0] - b[1][0];
      else return a[1][1] - b[1][1];
    });
  for (let i = 0; i < sorted.length; i++) {
    if (stack.length > 0) {
      // 현재와 stack top의 시간 차이
      let diff = calculateDiff(stack[stack.length - 1][1], sorted[i][1]);
      // diff는 반드시 양수
      while (diff > 0) {
        // 시간 안에 가장 위 과제를 끝낼 수 있는 경우
        if (diff >= stack[stack.length - 1][2]) {
          diff -= stack[stack.length - 1][2];
          answer.push(stack[stack.length - 1][0]);
          stack.pop();
        }
        // 가장 위 과제를 끝낼 수 없는 경우
        else {
          stack[stack.length - 1][2] -= diff;
          diff = 0;
        }
        if (stack.length === 0) break;
      }
    }
    stack.push(sorted[i]);
    if (i + 1 === sorted.length) {
      while (stack.length > 0) {
        answer.push(stack[stack.length - 1][0]);
        stack.pop();
      }
    }
  }
  return answer;
}
