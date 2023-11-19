// 랜선 자르기 : 이분 탐색, 매개변수 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [k, n] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v, 10));
const arr = input.map((v) => parseInt(v, 10));
let s = 0,
  e = Math.pow(2, 31) - 1,
  mid = Math.floor((s + e) / 2);
let answer = 0;

function paramSearch(arr, mid) {
  let cnt = 0;
  for (value of arr) cnt += Math.floor(value / mid);
  // 같으면 포함해야 함. 더 큰 값이 있을 수 있기 때문
  return cnt >= n;
}

while (s <= e) {
  if (paramSearch(arr, mid)) s = mid;
  else e = mid - 1;
  // floor가 아니라 ceil인 이유?
  // 두 개가 남았을 때(174, 175), 큰 값을 먼저 선택해야 하므로
  // 여기서 더 작은 값을 선택(floor)한다면, 더 큰 값을 선택하지 못함 => 만약 175도 가능했다면 틀린 결과
  // 더 큰 값을 선택(ceil)한다면, 더 큰 값이 범위에 속하지 않을 때 e - 1로 (174, 174)를 확인할 수 있음
  mid = Math.ceil((s + e) / 2);
  if (s === mid) {
    answer = s;
    break;
  }
}
console.log(answer);
