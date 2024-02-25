// 같이 눈사람 만들래?
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const sortFunction = (a, b) => a - b;
const snowRadius = input.shift().slice().sort(sortFunction);
const visited = new Array(n).fill(false);
const firstCandidates = [];
const secondCandidates = [];
// const cache = {};
// const solve = function (visited) {
//   const snows = [];
//   for (let i = 0; i < visited.length; i++) {
//     if (visited[i]) {
//       snows.push(snowRadius[i]);
//     }
//   }

//   console.log(snows);
// };
(function backtrack(min, depth) {
  if (depth === 3) {
    // solve(visited);
    // console.log(visited);
    return;
  }

  for (let i = min; i < n; i++) {
    visited[i] = true;
    backtrack(i + 1, depth + 1);
    visited[i] = false;
  }
})(0, 0);
