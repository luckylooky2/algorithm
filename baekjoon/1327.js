// 소트 게임 : 너비 우선 탐색, 그래프, 해시를 사용한 집합과 맵
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, k] = input.shift();
const arr = input.shift();
const target = arr.slice().sort((a, b) => a - b);
const q = [[arr, 0]];
const cache = {};
let idx = 0;

function check(target, arr) {
  for (let i = 0; i < target.length; i++) {
    if (target[i] !== arr[i]) {
      return false;
    }
  }
  return true;
}

let flag = false;

while (idx < q.length) {
  const [curr, count] = q[idx++];

  // 완료
  if (check(target, curr)) {
    console.log(count);
    flag = true;
    break;
  }

  for (let i = 0; i <= n - k; i++) {
    const reversed = curr.slice(i, i + k).reverse();
    const copyArr = curr.slice();
    copyArr.splice(i, k, ...reversed);
    const string = copyArr.join("");

    if (cache[string]) {
      continue;
    }
    cache[string] = true;
    q.push([copyArr, count + 1]);
  }
}

if (!flag) {
  console.log(-1);
}
