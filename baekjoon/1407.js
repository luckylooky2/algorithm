// 2로 몇 번 나누어질까 : 수학
const input = require("fs").readFileSync("/dev/stdin").toString().trim();
let [start, end] = input.split(" ").map((v) => BigInt(v));
let answer = BigInt(0);
let base = BigInt(1);

while (true) {
  const [isStartOdd, isEndOdd] = [!!(start % BigInt(2)), !!(end % BigInt(2))];

  if (isStartOdd) {
    start++;
  }
  if (isEndOdd) {
    end--;
  }

  answer +=
    ((end - start) / BigInt(2) +
      (isStartOdd ? BigInt(1) : BigInt(0)) +
      (isEndOdd ? BigInt(1) : BigInt(0))) *
    base;

  base *= BigInt(2);
  start /= BigInt(2);
  end /= BigInt(2);

  if (end === BigInt(0)) {
    break;
  }
}

console.log(String(answer));

// Try 1
// - 더 작은 제곱수에서 더 큰 제곱수까지 배열 할당 : 런타임 에러(RangeError)
// - 메모리보다 더 큰 배열이 생성될 수도 있기 때문에 잘못된 접근

// Try 2
// - 메모리를 사용하지 않고, 재귀 호출을 이용하여 n번째 수의 값을 구하는 방법
// - 분할 정복 : 제곱수와 제곱수의 가운데는 제곱수의 절반, 가운데를 가준으로 양 옆이 더 작은 문제로 볼 수 있다
// - start, end의 차이가 매우 큰 수가 될 수 있기 때문에 이 방식은 반복문조차 사용할 수 없음

// Answer
// - 이 수열의 특성을 이용 => 수열의 인덱스가 홀수인 항은 값이 1이다
// - 해당 항을 모두 제거하면, 남은 항들의 관계도 이전 수열과 같은 관계이다. 단, 모든 항의 2개 곱해져 있는 형태이다
// - e.g. [ 1, 9 ]
// - 첫 번째 : 1 2 1 4 1 2 1 8 1
// - 두 번째 : 2 4 2 8
// - 세 번째 : 4 8
// - 네 번째 : 8
// - 홀수 항을 제거하고(결과값에 더하고), 나머지 항을 2로 나눠주기를 반복하면 된다
// - 모든 항을 대상으로 하면(즉, 배열을 사용하면) 시간 초과가 발생하기 떄문에, 첫 항과 끝 항을 이용해 홀수의 개수를 구하는 방식을 사용한다
