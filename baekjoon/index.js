const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v, i) =>
    i === 0 ? parseInt(v, 10) : v.split(" ").map((v) => parseInt(v, 10))
  );

const cache = {};

// function combinations(arr, r, start = 0, data = [], index = 0) {
//   if (index === r) {
//     console.log(data.join(" "));
//     return;
//   }

//   for (let i = start; i < arr.length; i++) {
//     data[index] = arr[i];
//     combinations(arr, r, i + 1, data, index + 1);
//   }
// }

// const elements = Array.from({ length: input[1][1] }, (v, i) => i);
// const r = input[1][0];
// combinations(elements, r);

// r : true의 개수
// depth : 확인한 개수
function combination(n, r, element, visited = [], depth = 0) {
  // 탐색에 성공한 경우
  // 하지만, depth !== n일 가능성도 있음 : 아직 모든 원소를 탐색하지 않았는데 더 이상 선택할 원소가 없는 상태(e.g. TTT)를 의미
  if (r === 0) {
    console.log("ok", visited, depth, r);
    // console.log(
    //   visited
    //     .map((v, i) => (v ? element[i] : ""))
    //     .filter((v) => v !== "")
    //     .join(" ")
    // );
    return;
  }

  // 백트래킹 : 선택할 원소가 남아있지만(r !== 0) n개를 모두 탐색한 경우(e.g. TFTFF)에는 더 이상 탐색할 필요가 없으므로 재귀 호출을 종료하여 불필요한 탐색을 줄임
  // 즉, 탐색에 실패한 경우
  if (depth === n) {
    // console.log("no", visited, depth, r);
    return;
  }

  // true를 설정했기 때문에, r을 줄이고 재귀 호출
  visited[depth] = true;
  // 하나를 선택했다고 가정하고 r을 하나 줄이는 것
  combination(n, r - 1, element, visited, depth + 1);

  // 백트래킹 : 재귀적으로 탐색하는 과정에서 어떤 조건을 만족하지 않으면, 이전 상태로 되돌아가 다른 경우를 탐색
  // 해당 케이스를 지나왔으면, 다음 케이스를 찾기 위해 다시 원위치(TTT -> TTF)
  visited[depth] = false;
  // 하나를 되돌렸기 때문에 r을 줄이지 않고 다시 재귀 호출, depth는 증가(TTF -> TTF?)
  combination(n, r, element, visited, depth + 1);
}

// 1부터 시작
for (let i = 1; i <= input[0]; i++) {
  combination(
    input[i][1],
    input[i][0],
    Array.from({ length: input[i][1] }, (v, i) => i + 1)
  );
}

// // 1부터 시작
// for (let i = 1; i <= input[0]; i++) {
//   console.log(combination(input[i][1], input[i][0]));
// }
