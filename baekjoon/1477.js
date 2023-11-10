// 휴게소 세우기 : 이분 탐색, 매개변수 탐색
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [currNum, toBuildNum, length] = input.shift();
const arr = currNum === 0 ? [] : input.shift();
const sorted = [0].concat(arr.sort((a, b) => a - b));
sorted.push(length);

let start = 1,
  end = length;
let mid,
  answer = 0;

function check(mid, target) {
  let count = 0;
  for (let i = 1; i < sorted.length; i++) {
    // 휴게소 간 거리
    const diff = sorted[i] - sorted[i - 1];
    // diff 안에 세울 수 있는 새로운 휴게소의 수
    count += Math.floor(diff / mid);
    // 나누어 떨어지면, 끝점을 포함하게 되므로
    if (diff % mid === 0) count--;
  }
  return count > target;
}

while (start <= end) {
  mid = Math.floor((start + end) / 2);
  // 새로운 휴게소의 개수가 지어야 하는 개수보다 크면, mid를 늘려야 함
  // mid + 1이 아니라 start를 조정하여 반으로 줄임(업다운)
  if (check(mid, toBuildNum)) start = mid + 1;
  else {
    answer = mid;
    end = mid - 1;
  }
}

console.log(answer);
