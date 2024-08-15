// 신기한 소수: 소수, 백트래킹
const n = Number(require("fs").readFileSync(0, "utf-8").toString().trim());
const primes = { 2: true, 3: true, 5: true, 7: true };
const answer = [];

function checkPrime(visited) {
  const target = Number(visited.join(""));
  const root = Math.sqrt(target);
  let flag = false;
  for (let i = 2; i <= root; i++) {
    if (!(target % i)) {
      flag = true;
      break;
    }
  }

  return flag ? false : true;
}

(function recur(visited = []) {
  if (!checkPrime(visited)) {
    return;
  }

  if (visited.length && !primes[visited.at(0)]) {
    return;
  }

  if (visited.length === n) {
    answer.push(visited.join(""));
    return;
  }

  for (let i = 0; i <= 9; i++) {
    visited.push(i);
    recur(visited);
    visited.pop();
  }
})();

console.log(answer.join("\n"));

// Try 1 : 모든 소수를 구하고 백트래킹을 통해 소수인지를 확인
// - 7자리 이상의 모든 소수를 구하는 과정에서 시간 초과

// Try 2 : 백트래킹
// - 첫 번째 자리부터 유망하지 않은 케이스는 제외

// 백트래킹의 시간 복잡도는 어떻게 계산하는가?
