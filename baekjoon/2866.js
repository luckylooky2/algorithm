// 문자열 잘라내기 : 문자열, 해시를 사용한 집합과 맵, 이분 탐색, 정렬
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const [r, c] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const strings = input;
const verticalStrings = new Array(c).fill("");

for (const string of strings) {
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    verticalStrings[i] += char;
  }
}

let count = 0;
for (; count < r - 1; count++) {
  // 되면 count++ 안되면 break
  // 각 문자열의 count 번째를 0으로 만듦
  const compare = {};
  let flag = false;
  for (let i = 0; i < verticalStrings.length; i++) {
    verticalStrings[i] = verticalStrings[i].slice(1);
    if (compare[verticalStrings[i]]) {
      flag = true;
      break;
    } else {
      compare[verticalStrings[i]] = true;
    }
  }
  if (flag) {
    break;
  }
}

console.log(count);

// 1000 * 1000
// 중복된 문자열이 나오지 않는 가장 큰 지울 수 있는 row의 값?
// 주어진 문자열은 반드시 중복된 문자열이 나오지 않고, 1줄을 지울 때부터 중복된 문자열이 나올 수 있다
// 최대 r - 1

// 1줄을 없앨 때마다, O(n)

// Try 1
// verticalStrings[i] = verticalStrings[i].replace(verticalStrings[i][count], "0")
// - 앞에서부터 0을 패딩하는 새로운 문자열을 생성
// - 메모리 초과
// - 최대 1000 * 1000 = 1MB를 최대 1000번 돌면 1GB가 필요
// - GC가 그 사이에 돌지 않나?

// Try 2
// verticalStrings[i] = verticalStrings[i].slice(1)
// - slice를 이용하여 앞 문자 제거
// - 절반 정도 메모리를 아낀다해도 500MB 정도로 이미 초과
// - 통과(404MB, 2.9s): 둘 다 기준보다 초과이지만 통과
