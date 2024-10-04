// 잠입 : 구현, 그리디, 많은 조건 분기
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
let idx = 0;
const [n, m] = input[idx++].split(" ").map((v) => +v);
const [LEFT, RIGHT] = ["L", "R"];
let pos = 1;
let flag = false;

for (let i = 0; i < n - 1; i++) {
  const range = input[idx++].split(" ");
  const count = +range[0];
  let sensor;
  if (count > 0) {
    if (count === 1) {
      const [start, sdir] = [+range[1], range[2]];
      sensor = [sdir === LEFT ? [1, start] : [start, m]];
    } else if (count === 2) {
      const [start, sdir] = [+range[1], range[2]];
      const [end, edir] = [+range[3], range[4]];
      if (sdir === LEFT && edir === LEFT) {
        sensor = [[1, end]];
      } else if (sdir === LEFT && edir === RIGHT) {
        sensor = [
          [1, start],
          [end, m],
        ];
      } else if (sdir === RIGHT && edir === LEFT) {
        sensor = [[start, end]];
      } else if (sdir === RIGHT && edir === RIGHT) {
        sensor = [[start, m]];
      }
    }
  } else {
    sensor = [null];
  }

  for (const elem of sensor) {
    if (elem !== null) {
      const [start, end] = elem;
      if (end < pos || pos < start) {
        continue;
      } else {
        pos = end + 1;
        if (pos > m) {
          flag = true;
          break;
        }
      }
    }
  }
}

console.log(flag ? "NO" : "YES");

// Try 1
// 센서 조건
// - 센서가 1개일 때는 제대로 생각했지만, 2개일 때 충분한 조건을 고려하지 못했다.
// - 센서가 2개이면, 총 4가지 경우의 수가 발생하고 이를 모두 고려해주어야 한다.
// - 가운데가 뚫려있는 경우가 한 가지 발생하는데, 이를 위해 배열을 한 차원 높이는 방법으로 해결하였다.

// 로봇 조건
// - 로봇은 움직이는데 제약이 없기 때문에 로봇은 (x, y)를 x - 1 + y - 1 + 1 초만에 도착할 수 있다.
// - 다시 말해서, 상병이 임의의 점 (x, y)에 도착할 때 이동거리가 x - y + 1 이상이면 로봇에 잡힌다는 뜻이다.
// - 이렇게 되지 않기 위해서는 x, y의 값이 줄어들면 안 된다. 즉, 상병은 오른쪽과 아래 방향으로 밖에 움직이지 못한다.
// - 따라서 현재 칸에서 바로 아래로 내려가지 못한다면, 센서가 끝나는 오른쪽 끝 칼럼 + 1로 이동해야 한다.
// - 만약 이동한 칼럼이 m을 초과할 경우 반드시 로봇에게 잡히므로 루프를 종료한다.
