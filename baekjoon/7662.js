// 이중 우선순위 큐 : 맵, 우선수위 큐

// 자바스크립트 메모리 초과 이슈
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) =>
    v.split(" ").map((v) => {
      if (!(v === "I" || v === "D")) return parseInt(v, 10);
      else return v;
    })
  );
const [n] = input.shift();
let cnt = 0;
const map = new Map();
for (let i = 0; i < n; i++) {
  map.clear();
  const [j] = input[cnt];
  for (let k = 0; k < j; k++) {
    cnt++;
    const [command, value] = input[cnt];
    if (command === "I") {
      if (map.has(value)) map.set(value, map.get(value) + 1);
      else map.set(value, 1);
    } else {
      if (value === 1) {
        const max = Math.max(...map.keys());
        if (map.has(max)) {
          if (map.get(max) === 1) map.delete(max);
          else map.set(max, map.get(max) - 1);
        }
      } else {
        const min = Math.min(...map.keys());
        if (map.has(min)) {
          if (map.get(min) === 1) map.delete(min);
          else map.set(min, map.get(min) - 1);
        }
      }
    }
  }
  console.log(
    map.size === 0
      ? "EMPTY"
      : `${Math.max(...map.keys())} ${Math.min(...map.keys())}`
  );
  cnt++;
}
