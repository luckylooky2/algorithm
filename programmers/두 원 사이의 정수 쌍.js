// 두 원 사이의 정수 쌍 : 브루트 포스
let g_on;

function count(r) {
  g_on = 0;
  const dr = BigInt(r) * BigInt(r);
  let total = BigInt(0);
  let quarter = BigInt(0);
  for (let i = r - 1; i > 0; i--) {
    const di = BigInt(i) * BigInt(i);
    const rt = Math.sqrt(Number(dr - di));
    if (rt % 1 === 0) g_on++;
    const max = BigInt(Math.floor(rt));
    quarter += max;
  }
  total = quarter * BigInt(4) + BigInt(4) * BigInt(r) + BigInt(1);
  console.log(g_on, total);
  return total;
}

function solution(r1, r2) {
  return Number(count(r2) - count(r1)) + 4 + g_on * 4;
}
