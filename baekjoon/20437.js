// 문자열 게임 2 : 문자열, 슬라이딩 윈도우
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
const t = +input.shift();
const answer = [];

let idx = 0;

for (let i = 0; i < t; i++) {
  const str = input[idx++];
  const k = +input[idx++];
  const alpha = {};
  let result = [Infinity, -Infinity];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (alpha[char] === undefined) {
      alpha[char] = [i];
    } else {
      alpha[char].push(i);
    }
  }

  const greaterThanK = Object.entries(alpha).filter(
    ([key, value]) => value.length >= k
  );

  for (const [key, value] of greaterThanK) {
    let [s, e] = [0, k - 1];

    while (e < value.length) {
      const diff = value[e++] - value[s++] + 1;
      result[0] = Math.min(result[0], diff);
      result[1] = Math.max(result[1], diff);
    }
  }

  answer.push(result[0] === Infinity ? -1 : result);
}

console.log(answer.map((v) => (v === -1 ? -1 : v.join(" "))).join("\n"));
