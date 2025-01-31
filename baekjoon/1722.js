// 순열의 순서 : 수학, 구현, 조합론
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => BigInt(v)));
const [n] = input.shift().map(Number);
const [type, ...arr] = input.shift();
const availableCount = new Map([[n, 1n]]);
const remainNums = new Set();

for (let i = 1; i <= n; i++) {
  availableCount.set(n - i, availableCount.get(n - i + 1) * BigInt(i));
}

for (let i = 1; i <= n; i++) {
  remainNums.add(i);
}

if (type === 1n) {
  const answer = [];
  let offset = arr[0] - 1n;

  for (let i = 1; i <= n; i++) {
    // 현재 남은 오프셋에서 몇 번째 인덱스인지 구하기
    const quotient = Number(offset / availableCount.get(i));
    // 남은 Set을 배열로 변환
    const remainNumsArray = [...remainNums];

    // 현재 인덱스를 정답에 추가
    answer.push(remainNumsArray[quotient]);
    // 현재 숫자를 제거 중복을 방지
    remainNums.delete(remainNumsArray[quotient]);
    // 계산한 인덱스만큼 오프셋을 줄임
    offset %= availableCount.get(i);
  }

  console.log(answer.join(" "));
} else if (type === 2n) {
  let answer = 1n;

  // 현재 값이 remainNumsArray에서 몇 번째 인덱스인지 구해서 더해줌
  for (let i = 1; i <= n; i++) {
    const curr = Number(arr[i - 1]);
    // 남은 Set을 배열로 변환
    const remainNumsArray = [...remainNums];
    // 현재 숫자가 배열에서 몇 번째 인덱스인지 구함
    const idx = remainNumsArray.indexOf(curr);

    answer += availableCount.get(i) * BigInt(idx);
    // 현재 숫자를 제거하여 다음에 올 숫자의 정확한 인덱스를 구할 수 있게 함
    remainNums.delete(curr);
  }

  console.log(answer.toString());
}

// 조합이 아니라 순열 => 팩토리얼
// - 모든 경우를 순회할 수 없다.

// 100n--와 100n - 1n은 다른가?
// - 100n--는 Uncaught SyntaxError: Invalid left-hand side expression in postfix operation 에러를 발생시킨다.
