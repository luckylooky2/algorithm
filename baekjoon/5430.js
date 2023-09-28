// AC : 문자열, 덱
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const n = parseInt(input.shift(), 10);
const answer = [];

for (let i = 0; i < n; i++) {
  const funcs = input.shift().split("");
  const num = parseInt(input.shift(), 10);
  const tmp = input.shift();
  const arr = tmp
    .slice(1, tmp.length - 1)
    .split(",")
    .map((v) => parseInt(v, 10));
  let left = 0;
  let right = arr.length - 1;
  let reversed = false;
  let size = num;
  const result = [];
  funcs.map((v) => {
    if (v === "R") {
      reversed = !reversed;
    } else if (v === "D") {
      if (reversed) right--;
      else left++;
      size--;
    }
  });
  if (size < 0) answer.push("error");
  else {
    if (reversed) for (let i = 0; i < size; i++) result.push(arr[right - i]);
    else for (let i = 0; i < size; i++) result.push(arr[left + i]);
    answer.push(`[${result.join(",")}]`);
  }
}

console.log(answer.join("\n"));
