// 몇개고? : 구현
const [hour, withDrink] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split(" ")
  .map((v, i) => (i ? Boolean(+v) : +v));
const isLunch = (hour) => hour >= 12 && hour <= 16;

if (withDrink || !isLunch(hour)) {
  console.log(280);
} else if (isLunch(hour) && !withDrink) {
  console.log(320);
}
