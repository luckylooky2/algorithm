// 네 개의 소수 : 수학, 소수, 에라토스네테스의 체, 골드바흐의 추측, 백트래킹
const number = Number(require("fs").readFileSync(0, "utf-8").toString().trim());
const indexes = new Array(number + 1).fill(-1);
const primeNumber = [];

for (let i = 2; i <= number; i++) {
  let flag = false;
  for (let j = Math.floor(Math.sqrt(i)); j > 1; j--) {
    if (!(i % j)) {
      flag = true;
      break;
    }
  }
  if (!flag) {
    primeNumber.push(i);
  }
  indexes[i] = primeNumber.length;
}

let flag = false;

function dfs(arr, target, number, visited = [], sum = 0) {
  if (flag) {
    return;
  }

  if (sum > number) {
    return;
  }

  if (visited.length === 4) {
    if (sum === number) {
      console.log(visited.join(" "));
      flag = true;
    }
    return;
  }
  const sliced = arr.slice(0, indexes[target]);
  for (let i = sliced.length - 1; i >= 0; i--) {
    const elem = sliced[i];
    const newTarget = sum + elem;
    if (newTarget > number) {
      continue;
    }
    visited.push(elem);
    dfs(sliced, newTarget, number, visited, sum + elem);
    visited.pop();
  }
}

dfs(primeNumber, number, number);

if (!flag) {
  console.log(-1);
}

// 골드바흐의 추측: 2보다 큰 어떠한 짝수도 두 개의 소수의 합으로 나타낼 수 있다
// - 이 명제가 맞다면, 8보다 큰 모든 수는 네 개의 소수로 나타낼 수 있다
// - 짝수: [2, x], [3, y]
// - 홀수: [2, x], [2, y]
// - target에서 4 또는 5를 뺀 수를 두 소수의 합으로 찾으면 된다
