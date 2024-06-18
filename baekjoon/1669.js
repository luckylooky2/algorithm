// 멍멍이 쓰다듬기 : 수학
const [monkey, dog] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => Number(v));
const diff = dog - monkey;

if (diff === 0) {
  console.log(0);
} else {
  const sqrt = Math.sqrt(diff);
  const curr = Math.pow(Math.floor(sqrt), 2);
  if (sqrt % 1 === 0) {
    console.log(2 * sqrt - 1);
  } else {
    const next = Math.pow(Math.floor(sqrt) + 1, 2);
    if ((curr + next) / 2 < diff) {
      console.log(Math.floor(sqrt) * 2 + 1);
    } else {
      console.log(Math.floor(sqrt) * 2);
    }
  }
}

// 0 => 0
// 1 => 1 (1)
// 2 => 11 (2)
// 3 => 111 (3)
// 4 => 121 (3)
// 5 => 1211 (4)
// 6 => 1221 (4)
// 7 => 12121 (5)
// 8 => 12221 (5)
// 9 => 12321 (5)
// 10 => 6
// 11 => 6
// 12 => 6
// 13 => 7
// 14 => 7
// 15 => 7
// 16 => 1234321 (7)

// Fly me to the Alpha Centauri(1011) 문제와 똑같은 문제
