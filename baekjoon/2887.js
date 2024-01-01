// 행성 터널 : 정렬, 그래프, 최소 스패닝 트리
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n] = input.shift();
const withIndex = input.map((v, i) => [...v, i]);
const sortedX = withIndex.map((v) => v).sort((a, b) => a[0] - b[0]);
const sortedY = withIndex.map((v) => v).sort((a, b) => a[1] - b[1]);
const sortedZ = withIndex.map((v) => v).sort((a, b) => a[2] - b[2]);

const parentArr = new Array(n + 1).fill(null).map((_v, i) => i);

function getParent(a, parentArr) {
  if (parentArr[a] === a) return a;
  else return getParent(parentArr[a], parentArr);
}

function union(a, b, parentArr) {
  a = getParent(a, parentArr);
  b = getParent(b, parentArr);

  if (a > b) parentArr[a] = b;
  else parentArr[b] = a;
}

function find(a, b, parentArr) {
  a = getParent(a, parentArr);
  b = getParent(b, parentArr);
  return a === b;
}

const edges = [];
for (let i = 0; i < sortedX.length - 1; i++) {
  edges.push([
    sortedX[i][3] + 1,
    sortedX[i + 1][3] + 1,
    Math.abs(sortedX[i][0] - sortedX[i + 1][0]),
  ]);
}
for (let i = 0; i < sortedY.length - 1; i++) {
  edges.push([
    sortedY[i][3] + 1,
    sortedY[i + 1][3] + 1,
    Math.abs(sortedY[i][1] - sortedY[i + 1][1]),
  ]);
}
for (let i = 0; i < sortedZ.length - 1; i++) {
  edges.push([
    sortedZ[i][3] + 1,
    sortedZ[i + 1][3] + 1,
    Math.abs(sortedZ[i][2] - sortedZ[i + 1][2]),
  ]);
}

const sorted = edges.sort((a, b) => a[2] - b[2]);

let answer = 0;

for (let i = 0; i < sorted.length; i++) {
  const [start, end, cost] = sorted[i];
  if (!find(start, end, parentArr)) {
    union(start, end, parentArr);
    answer += cost;
  }
}

console.log(answer);

// 행성 간의 거리 배열을 만들 수는 있는데 100,000^2 이기 때문에 시간 초과가 발생
// 크루스칼 알고리즘을 사용하려면 가장 짧은 행성 간의 거리를 오름차순으로 알 수 있어야 함
// 정렬을 사용해야 하는데 어떻게?

// 접근 1
// x, y, z를 오름차순으로 각각 정렬
// 각각의 정렬된 배열 중에서 다음 항목과 비교하며, 가장 차이가 작은 x, y, z 배열 중 하나를 고름
// find를 통해서 두 인덱스가 같은 영역에 속하는지 확인
// 그렇다면 continue, 아니라면 union
// 한계점 : x, y, z를 오름차순으로 정렬했다고 해서 다음 항목과의 차이가 최소가 되는 것은 아님
// [-10, 1, 4, 4] 처럼 가장 뒤에 위치할 수도 있음

// 접근 2
// x, y, z를 오름차순 정렬한 배열의 다음 항목과의 "차이"를 새로운 배열 edges에 저장
// 0번째 행성과 1번째 행성의 차이, 1번째 행성과 2번째 행성의 차이는 유효하지만 0번째 행성과 2번째 행성의 차이는 유효하지 않음
// 반드시 앞 2개의 값보다 크거나 같을 것이기 때문 => 정렬된 배열에서 바로 앞, 뒤 항목을 차이만을 고려해도 괜찮은 상황
// 이 방법에 대해 생각을 해보았지만, 너무 복잡할 것 같다는 생각과 증명애 대한 확신이 없었으므로 그냥 넘어갔음
