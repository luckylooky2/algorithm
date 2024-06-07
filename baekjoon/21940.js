// 가운데에서 만나기 : 그래프, 플로이드-워셜, 최단 경로, 브루트 포스
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
const distance = new Array(cityCnt)
  .fill(null)
  .map(() => new Array(cityCnt).fill(Infinity));

for (let i = 0; i < pathCnt; i++) {
  paths[i] = input[i];
}
for (let i = 0; i < cityCnt; i++) {
  distance[i][i] = 0;
}

// 단방향
for (let [start, end, length] of paths) {
  distance[start - 1][end - 1] = length;
}

// 플로이드-워셜
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

const longestRoundTrip = [];
const answer = [];

// 브루트 포스
for (let i = 0; i < cityCnt; i++) {
  const roundTrip = [];
  for (let city of liveCity) {
    city--;
    if (city === i) roundTrip.push(0);
    else {
      roundTrip.push(distance[city][i] + distance[i][city]);
    }
  }
  const sortedRoundTrip = roundTrip.sort((a, b) => a - b);
  longestRoundTrip.push([sortedRoundTrip[sortedRoundTrip.length - 1], i + 1]);
}

const sortedLongestRoundTrip = longestRoundTrip.sort((a, b) => a[0] - b[0]);
const smallestRoundTrip = sortedLongestRoundTrip[0][0];

for (let elem of sortedLongestRoundTrip) {
  if (smallestRoundTrip === elem[0]) {
    answer.push(elem[1]);
  } else break;
}

console.log(answer.sort((a, b) => a - b).join(" "));
