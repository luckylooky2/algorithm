// 감소하는 수 : 브루트 포스, 백트래킹
const n = Number(require("fs").readFileSync("/dev/stdin").toString().trim());
const sortFunction = (a, b) => a - b;
const dscNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let currArr = [[0], [1], [2], [3], [4], [5], [6], [7], [8], [9]];
let isSatisfied = false;
let isEnd = false;
let lastDscNum = 9876543210;

while (!isSatisfied) {
  const newCurrArr = new Array(10).fill(null).map(() => new Array(0));
  // 브루트 포스
  // 수의 첫 번째 숫자끼리 묶음
  for (let i = 0; i < currArr.length; i++) {
    const elem = currArr[i];
    if (i === 0) {
      continue;
    }
    const sorted = elem.sort(sortFunction);
    // 첫 번째 숫자가 같은 숫자 배열 순회
    for (const num of sorted) {
      const first = i;
      const last = num % 10;
      const nextBase = num * 10;
      // 마지막 숫자보다 1 낮은 숫자부터 0까지 순회
      for (let j = last - 1; j >= 0; j--) {
        const nextNum = nextBase + j;
        newCurrArr[first].push(nextNum);
        dscNums.push(nextNum);
        if (nextNum === lastDscNum) {
          isEnd = true;
          break;
        }
      }
      if (isEnd || dscNums.length > n) {
        isSatisfied = true;
        break;
      }
    }
    if (isSatisfied) {
      break;
    }
  }
  currArr = newCurrArr;
}

console.log(n > dscNums.length - 1 ? -1 : dscNums.sort(sortFunction)[n]);

// 최대 감소하는 수가 정해져있음 => 9876543210
// 따라서 브루트 포스 사용 가능
