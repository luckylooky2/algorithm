// 실습용 로봇 : 구현
function solution(command) {
  let [x, y] = [0, 0];
  const [RIGHT, LEFT, GO, BACK] = ["R", "L", "G", "B"];
  command = command.split("");
  const dir = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let index = 0;

  for (const cmd of command) {
    if (cmd === RIGHT) {
      index = (index + 1) % 4;
    } else if (cmd === LEFT) {
      index = (index - 1 + 4) % 4;
    } else if (cmd === GO) {
      x += dir[index][0];
      y += dir[index][1];
    } else if (cmd === BACK) {
      x -= dir[index][0];
      y -= dir[index][1];
    }
  }
  return [x, y];
}
