// 멀쩡한 사각형 : 수학, 구현, 최대공약수
function GCD(a, b) {
  const big = a > b ? a : b;
  const small = a > b ? b : a;
  const r = big % small;

  if (r === 0) {
    return small;
  }

  return GCD(small, r);
}

function solution(w, h) {
  let answer = BigInt(w) * BigInt(h);
  const big = w > h ? w : h;
  const small = w > h ? h : w;
  const least = [0];
  const gcd = GCD(big, small);
  const nSmall = small / gcd;
  const nBig = big / gcd;
  let total = 0;

  for (let x = 1; x <= nSmall; x++) {
    const res = BigInt(nBig) * BigInt(x);
    const up = Math.ceil(Number(res) / nSmall);
    const down = Math.floor(Number(res) / nSmall);
    const curr = up - least[x - 1];
    answer -= BigInt(curr);
    total += curr;
    least.push(down);
  }
  answer -= BigInt((small / nSmall - 1) * total);
  return answer;
}

// 50'02" / 60'00"

// 1. 나눗셈 후 곱셈을 하면 오차가 더 커질 수 있기 때문에, 곱셈 후 나눗셈(마지막)으로 변경 => 나눗셈을 뒤로 미룸
// 2. w 와 h 중 더 짧은 쪽을 기준으로 순회 => 시간 초과 이슈 해결
// 3. core dumped? 메모리 부족이라고 생각함 => 미리 생성이 아닌 push 방식으로 변경
