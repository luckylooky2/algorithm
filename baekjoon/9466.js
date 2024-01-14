// 텀 프로젝트 : 그래프, 깊이 우선 탐색, 해시를 사용한 집합과 맵
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [caseCnt] = input.shift();
let inputIndex = 0;
let i = 0;
const answer = [];

while (i < caseCnt) {
  const [studentCnt] = input[inputIndex++];
  const favoriteArr = input[inputIndex++];
  const result = new Array(studentCnt + 1).fill(0);
  for (let j = 1; j <= studentCnt; j++) {
    const trace = [j];
    const visited = {};
    let traceIndex = 0;
    visited[j] = traceIndex;

    while (result[j] === 0) {
      const next = favoriteArr[trace[trace.length - 1] - 1];
      if (result[next] != 0) {
        for (let k = 0; k < trace.length; k++) {
          result[trace[k]] = 1;
        }
        break;
      } else if (visited[next]) {
        let startIndex = visited[next];
        for (let k = 0; k < trace.length; k++) {
          if (k >= startIndex && k <= traceIndex) {
            result[trace[k]] = 2;
          } else {
            result[trace[k]] = 1;
          }
        }
        break;
      } else {
        trace.push(next);
      }
      visited[next] = ++traceIndex;
    }
  }
  let count = 0;
  for (let i = 1; i < result.length; i++) {
    if (result[i] == 1) {
      count++;
    }
  }
  answer.push(count);
  i++;
}

console.log(answer.join("\n"));

// 메모리 초과
// - 잘못된 로직에 의해서도 메모리 초과가 발생할 수 있다
// - e.g. (무한 반복에 가까운) 많은 반복이 발생하여 그 정보를 모두 저장하는 경우
// - 시간 초과가 발생하기 전에 메모리 초과가 발생할 수 있다(자주 발생할 것 같지는 않다)

// 시간 초과
// - result 배열에 저장하지 않은 노드에서 result 배열에 저장한 노드로 접근할 수도 있다
// - 이 경우 똑같은 로직을 반복하기 떄문에 시간 초과가 발생할 수 있다
