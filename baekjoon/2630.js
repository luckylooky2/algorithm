const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = parseInt(input[0], 10);
const arr = input.filter((v, i) => i !== 0).map((v) => v.split(" "));

let final = { white: 0, blue: 0 };

function check(x, y, n) {
  let w = 0;
  let b = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let color = arr[x + i][y + j];
      if (color === "1") b++;
      else if (color === "0") w++;
    }
  }
  if (b === 0) return "0";
  else if (w === 0) return "1";
  else return "2";
}

// default parameter
// 기본값 매개변수 뒤쪽의 기본값 없는 매개변수
// 매개변수는 여전히 왼쪽에서 오른쪽으로 설정됩니다. 아래 예제에서 뒷쪽에 기본값이 없는 매개변수가 있지만 기본값 매개변수를 덮어씁니다.
function divide(n, x = 0, y = 0) {
  const half = n / 2;

  if (n === 2) {
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++)
        arr[x + i][y + j] === "0" ? final.white++ : final.blue++;
    return;
  }

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      let headX = x + i * half;
      let headY = y + j * half;
      let res = check(headX, headY, half);

      if (res === "0") final.white++;
      else if (res === "1") final.blue++;
      else divide(half, headX, headY);
    }
  }
}

let first = check(0, 0, n);
if (first === "0") final.white++;
else if (first === "1") final.blue++;
else divide(n);

console.log(
  Object.entries(final)
    .map((v) => v[1])
    .join("\n")
);
