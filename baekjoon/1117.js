// 색칠 : 구현
const [maxX, maxY, foldX, foldYCount, x1, y1, x2, y2] = require("fs")
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split(" ")
  .map(Number);
const newMaxX = Math.max(maxX - foldX, foldX);
const newMaxY = Math.min(maxY, maxY / (foldYCount + 1));
const overlapX = [0, 2];
const overlapY = [0, 0];
let total = BigInt(maxX) * BigInt(maxY);

if (foldX > Math.floor(maxX / 2)) {
  overlapX[0] = maxX - foldX;
} else if (foldX > 0) {
  overlapX[0] = foldX;
}

overlapY[0] = newMaxY;
overlapY[1] = foldYCount + 1;

// areaA : 접힌 부분, areaB : 접히지 않은 부분
let [areaA, areaB] = [0n, 0n];

// 경우의 수
if (overlapX[0] === 0) {
  areaB = BigInt(x2 - x1) * BigInt(y2 - y1) * BigInt(overlapY[1]);
} else if (overlapX[0] >= x2) {
  areaA = BigInt(x2 - x1) * BigInt(y2 - y1) * BigInt(overlapX[1]) * BigInt(overlapY[1]);
} else if (overlapX[0] <= x1) {
  areaB = BigInt(x2 - x1) * BigInt(y2 - y1) * BigInt(overlapY[1]);
} else {
  areaA = BigInt(overlapX[0] - x1) * BigInt(y2 - y1) * BigInt(overlapX[1]) * BigInt(overlapY[1]);
  areaB = BigInt(x2 - overlapX[0]) * BigInt(y2 - y1) * BigInt(overlapY[1]);
}

const colored = (areaA + areaB) * (areaA + areaB > 0n ? 1n : -1n);

console.log(String(total - colored));

// 모든 칸에 값을 적어놓는 것은 불가능 => 10^18 칸
// foldX = 0, foldYCount = 0 가능 => 접지 않을 수 있다
