// 줄어드는 수 : 브루트 포스, 백트래킹
const n = +require("fs").readFileSync(0, "utf-8").trim();
// const dp = new Array(11).fill(null).map(() => new Array(10).fill(0));
const table = new Array(11)
  .fill(null)
  .map(() => new Array(10).fill(null).map(() => new Array(0)));
const answer = [null];

for (let i = 0; i < 10; i++) {
  //   dp[1][i] = 1;
  const newString = `${i}`;
  table[1][i].push(newString);
  answer.push(newString);
}

for (let i = 1; i <= 10; i++) {
  //   let sum = 0;
  for (let j = 0; j < 10; j++) {
    const prefix = j;
    // if (j >= i - 1) {
    //   sum += dp[i - 1][j - 1];
    //   dp[i][j] += sum;
    // }
    for (let k = 0; k < prefix; k++) {
      // 한 자리 수 이전(i - 1)의 prefix 이하의(k) 모든 인덱스의 결과물에 prefix를 더한다.
      for (const substring of table[i - 1][k]) {
        const newString = prefix + substring;
        table[i][j].push(newString);
        answer.push(newString);
      }
    }
  }
}

// 정렬 불필요?
console.log(n >= 1024 ? "-1" : answer[n]);

// 총 1023개
// 1: 0, 1023: 9876543210
