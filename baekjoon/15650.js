const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => parseInt(v, 10));

function print(visited, element) {
  console.log(
    visited
      .map((v, i) => (v ? element[i] : ""))
      .filter((v) => v !== "")
      .join(" ")
  );
}

function combination(n, r, element, visited = [], depth = 0) {
  if (r === 0) {
    print(visited, element);
    return;
  }

  if (depth === n) return;

  visited[depth] = true;
  combination(n, r - 1, element, visited, depth + 1);

  visited[depth] = false;
  combination(n, r, element, visited, depth + 1);
}

combination(
  input[0],
  input[1],
  Array.from({ length: input[0] }, (v, i) => i + 1)
);
