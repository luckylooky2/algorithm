// 물병 : 브루트 포스, 그리디
const [n, k] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((v) => Number(v));
const powered = [1];

let num = 1;
let pow = 0;
while (num * 2 <= n) {
  num *= 2;
  powered.push(num);
  pow++;
}
const arr = new Array(pow + 1).fill(0);
let index = pow;
let total = n;
let count = 0;
while (index >= 0 && total >= 0 && count <= k) {
  let flag = false;
  if (powered[index] <= total) {
    flag = true;
  }

  if (count + (flag ? 1 : 0) > k) {
    break;
  }

  if (flag) {
    total -= powered[index];
    arr[index] = 1;
    count += 1;
  }
  index--;
}

if (total) {
  let i = 0;
  for (; i < arr.length; i++) {
    if (arr[i]) {
      break;
    }
  }
  console.log(powered[i] - total);
} else {
  console.log(0);
}

// 불가능한 경우가 있는가? 없는 듯
// - 0개라면 불가능하지만, 문제에서 요구하는 최소 k가 1이므로 계속 더하다보면 언젠가는 2의 제곱수가 되기 때문이다.

// Try 1
// - 물병에 담긴 물의 양은 2의 제곱수가 되어야 한다.
// - 즉, 물 옮기기를 반복하다보면 물의 양을 이진수로 나타낼 수 있다.
// - 물의 양을 이진수로 나타내었을 때, 물을 담은 물병의 수가 k개 이하가 되도록 하는 수를 구하는 문제이다.
// - 로직
//   - 이진수 배열을 구하다가 물병이 k개가 되는 순간 break
//   - 남은 수(total)이 있다면? 물병을 추가해야 하고, 없다면 답은 0
//   - 답은 이진수 배열에서 가장 처음 1이 나타나는 2의 제곱수 - 남은 수
//   - why? 이미 k개를 만족한 어떠한 배열에서도 1을 더할 때, 1의 개수는 k를 넘지 않는다.
//   - e.g. 101 + 1 = 110 (2개 유지), 11 + 1 = 100(1개 감소)
// - 이진수로 변환 과정에서 등호를 빼먹어서 채점 실패
// - 등호를 넣었더니 통과 + 상대적으로 시간 효율적

// Try 2
// - 이진수를 구해서 1의 개수가 k보다 많다면, 1의 개수가 k보다 작아질 때까지 1을 더해가면서 확인
// - 통과는 했지만 상대적으로 시간 비효율적

// const [n, k] = require("fs")
//   .readFileSync("/dev/stdin")
//   .toString()
//   .trim()
//   .split(" ")
//   .map((v) => Number(v));

// function countOne(number) {
// 	let count = 0;
// 	while (number > 0) {
// 	  if (number % 2) {
// 		count++;
// 	  }
// 	  number = Math.floor(number / 2);
// 	}
// 	return count;
//   }

//   let plus = 0;
//   while (true) {
// 	const count = countOne(n + plus);
// 	if (count <= k) {
// 	  console.log(plus);
// 	  break;
// 	}
// 	plus++;
//   }
