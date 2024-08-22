// 경로 찾기 : 너비 우선 탐색, 그래프
const input = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n");
const [n, length] = input[0].split(" ").map((v) => Number(v));
const strings = input.slice(1, 1 + n);
const [from, to] = input[1 + n].split(" ").map((v) => Number(v));
const binaries = new Array(n + 1).fill(null).map(() => new Array(2));
const distances = new Array(n + 1)
  .fill(null)
  .map(() => new Array(n + 1).fill(0));
const prev = new Array(n + 1).fill(0);

// 비트에서 1의 개수 구하기
function getNumberOfOne(number) {
  let count = 0;

  // 어떤 수와, 어떤 수보다 1 작은 수를 AND 연산하면 가장 오른쪽 1이 사라짐
  // - 어떤 수의 특정 자리가 1이라면, 어떤 수보다 1 작은 수의 특정 자리는 0이 됨
  // - 두 수를 AND 연산하면, 원래 1이었던 자리를 제외하곤 유지(변하지 않았으므로) 원래 1이었던 자리는 0으로 바뀜
  while (number) {
    const minus = number - 1;
    number = number & minus;
    count++;
  }

  return count;
}

// string to binary
for (let i = 0; i < strings.length; i++) {
  const original = strings[i];
  const index = i + 1;
  let binary = 0;

  for (const char of original) {
    if (Number(char)) {
      binary |= 1;
    }
    binary <<= 1;
  }
  binary >>= 1;

  binaries[index] = [binary, original];
}

for (let i = 1; i < binaries.length; i++) {
  const first = binaries[i];
  for (let j = i + 1; j < binaries.length; j++) {
    const second = binaries[j];
    const diff = first[0] ^ second[0];
    const numberOfOne = getNumberOfOne(diff);

    distances[i][j] = numberOfOne;
    distances[j][i] = numberOfOne;
  }
}

const q = [];
let idx = 0;

for (let i = 1; i < distances[from].length; i++) {
  if (distances[from][i] === 1) {
    q.push([from, i]);
  }
}
prev[from] = -1;

while (idx < q.length) {
  const [from, to] = q[idx++];
  prev[to] = from;

  for (let i = 1; i < distances[to].length; i++) {
    // prev 배열이 visited 배열 역할도 함
    if (distances[to][i] === 1 && !prev[i]) {
      q.push([to, i]);
    }
  }
}

if (prev[to]) {
  const result = [to];
  let curr = prev[to];
  while (curr !== -1) {
    result.push(curr);
    curr = prev[curr];
  }
  console.log(result.reverse().join(" "));
} else {
  console.log(-1);
}
