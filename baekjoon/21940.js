// 가운데에서 만나기 : 그래프, 플로이드, 최단 경로, 브루트 포스
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [cityCnt, pathCnt] = input.shift();
const paths = new Array(pathCnt);
const [personCnt] = input[pathCnt];
const liveCity = input[pathCnt + 1];
for (let i = 0; i < pathCnt; i++) {
  paths[i] = input[i];
}
const distance = new Array(cityCnt)
  .fill(null)
  .map(() => new Array(cityCnt).fill(Infinity));
for (let i = 0; i < cityCnt; i++) {
  distance[i][i] = 0;
}

// 단방향
for (let [start, end, length] of paths) {
  distance[start - 1][end - 1] = length;
}

// 플로이드-와샬
for (let i = 0; i < cityCnt; i++) {
  for (let j = 0; j < cityCnt; j++) {
    for (let k = 0; k < cityCnt; k++) {
      const currVal = distance[j][k];
      const newVal = distance[j][i] + distance[i][k];
      if (currVal > newVal) {
        distance[j][k] = newVal;
      }
    }
  }
}

const result = [];
const answer = [];

// 브루트 포스
for (let i = 0; i < cityCnt; i++) {
  const total = [];
  for (let city of liveCity) {
    city--;
    if (city === i) total.push(0);
    else {
      total.push(distance[city][i] + distance[i][city]);
    }
  }
  const sorted = total.sort((a, b) => a - b);
  result.push([sorted[sorted.length - 1], i + 1]);
}

const sorted = result.sort((a, b) => a[0] - b[0]);
const smallest = sorted[0][0];

for (let elem of sorted) {
  if (smallest === elem[0]) {
    answer.push(elem[1]);
  } else break;
}

console.log(answer.sort((a, b) => a - b).join(" "));
