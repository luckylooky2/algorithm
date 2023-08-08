const arr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseInt(v, 10)));
const [n, value] = arr.shift();
const final = [[], []];

arr.sort((a, b) => a - b);

for (let i = 0; i <= value; i++) {
  final[0][i] = i % arr[0] ? 0 : 1;
}

for (let i = 1; i < n; i++) {
  const most = arr[i];
  const prevIndex = i % 2 ? 0 : 1;
  const nextIndex = i % 2 ? 1 : 0;
  for (let j = 0; j <= value; j++) {
    final[nextIndex][j] =
      final[prevIndex][j] + (j - most >= 0 ? final[nextIndex][j - most] : 0);
  }
}

console.log(final[(n - 1) % 2][value]);
