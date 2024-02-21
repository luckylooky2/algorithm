// 겹치는 건 싫어 : 투 포인터
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n, k] = input.shift();
const arr = input.shift();
class Cache {
  constructor() {
    this.count = {};
  }
  add = function (target) {
    if (this.count[target] === undefined) {
      this.count[target] = 1;
    } else {
      this.count[target]++;
    }
  };

  subtrack = function (target) {
    this.count[target]--;
    if (this.count[target] === 0) {
      delete this.count[target];
    }
  };
}
const cache = new Cache();
let answer = 0;
let p1 = 0,
  p2 = 0;

while (p2 < n) {
  const curr = arr[p2];
  cache.add(curr);
  if (cache.count[curr] > k) {
    let first = arr[p1];
    while (cache.count[curr] > k) {
      cache.subtrack(first);
      first = arr[++p1];
    }
  }
  answer = Math.max(answer, p2 - p1 + 1);
  p2++;
}

console.log(answer);

// 10 2 => 9
// 1 10 11 12 1 13 14 15 1 16
