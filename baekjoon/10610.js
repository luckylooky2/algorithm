// 30 : 정렬, 문자열, 그리디
const original = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("")
  .map((v) => Number(v));
(function solve() {
  const sorted = original.sort((a, b) => b - a);
  let count = 0;
  if (sorted.at(-1) !== 0) {
    console.log(-1);
    return;
  }
  while (sorted.at(-1) === 0) {
    sorted.pop();
    count++;
  }
  const suffix = "0".repeat(count);
  let total = sorted.reduce((total, curr) => total + curr);
  // 0개 제외
  if (total % 3 === 0) {
    console.log(sorted.join("") + suffix);
    return;
  }
  //   // 1개 제외
  //   for (let i = sorted.length - 1; i >= 0; i--) {
  //     total -= sorted[i];
  //     if (total % 3 === 0 && total !== 0) {
  //       console.log(
  //         sorted.slice(0, i).join("") +
  //           sorted.slice(i + 1, sorted.length).join("") +
  //           suffix
  //       );
  //       return;
  //     }
  //     total += sorted[i];
  //   }
  //   // 2개 제외
  //   for (let i = sorted.length - 1; i >= 0; i--) {
  //     total -= sorted[i];
  //     for (let j = i - 1; j >= 0; j--) {
  //       total -= sorted[j];
  //       if (total % 3 === 0 && total !== 0) {
  //         console.log(
  //           sorted.slice(0, j).join("") +
  //             sorted.slice(j + 1, i).join("") +
  //             sorted.slice(i + 1, sorted.length).join("") +
  //             suffix
  //         );
  //         return;
  //       }
  //       total += sorted[j];
  //     }
  //     total += sorted[i];
  //   }
  console.log(-1);
})();

// 문제 해석 오류 : 모든 숫자를 사용하여(숫자를 모두 사용하지 않으면 안 됨) 가장 큰 수를 만들어야 함
// 모두 사용하여 만들 수 없으면 -1 출력
