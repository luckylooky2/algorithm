// 수 고르기
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v, 10));
// 정렬 순서를 바꾸었더니 통과되는 케이스가 생김
const arr = input.map((v) => parseInt(v, 10)).sort((a, b) => a - b);
let answer = arr.length === 1 ? 0 : Infinity;

for (let i = 0; i < n; i++) {
  let s = i,
    e = n,
    mid;
  while (s < e) {
    mid = Math.floor((s + e) / 2);
    if (arr[mid] - arr[i] >= m) e = mid;
    else s = mid + 1;
  }
  if (e === n) break;
  answer = Math.min(arr[s] - arr[i], answer);
}

console.log(answer);
