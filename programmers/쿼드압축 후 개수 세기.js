// 쿼드압축 후 개수 세기 : 분할 정복
var answer = [0, 0];

function divide(arr, n, start) {
  if (n === 1) {
    return arr[start[0]][start[1]];
  }
  const length = n / 2;
  const res = [];
  for (let i = 0; i < 2; i++) {
    const row = start[0] + length * i;
    for (let j = 0; j < 2; j++) {
      const col = start[1] + length * j;
      res.push(divide(arr, length, [row, col]));
    }
  }
  let c1 = 0,
    c0 = 0;
  for (const elem of res) {
    if (elem === 0) {
      c0++;
    } else if (elem === 1) {
      c1++;
    }
  }
  if (c0 === 4) {
    answer[0] -= 3;
    return 0;
  } else if (c1 === 4) {
    answer[1] -= 3;
    return 1;
  } else {
    return -1;
  }
}

function solution(arr) {
  for (const arr1 of arr) {
    for (const elem of arr1) {
      elem === 0 ? answer[0]++ : answer[1]++;
    }
  }
  const n = arr.length;
  divide(arr, n, [0, 0]);
  return answer;
}

// 40'42" / 60'00"
