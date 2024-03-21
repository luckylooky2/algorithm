// 경로 찾기 : 그래프, 플로이드
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const map = input;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    // 자기 자신으로 돌아올 수 있어야 하기 때문에 i !== j 조건 해제
    if (!map[i][j]) {
      map[i][j] = Infinity;
    }
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) {
      if (map[j][k] > map[j][i] + map[i][k]) {
        map[j][k] = 1;
      }
    }
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] === Infinity) {
      map[i][j] = 0;
    }
  }
}

console.log(map.map((v) => v.join(" ")).join("\n"));

// 노드 간 직접 연결된 정보를 가지고 중간에 특정 지점을 들리는 알고리즘을 통해 최단 경로를 찾는다
// 중간 지점을 반복문 가장 밖에 두어야 함
// O(n^3), Infinity 세팅이 필요함
