// 우박수열 정적분 : 구현
function integral(numList) {
  let sum = 0;
  for (let i = 0; i < numList.length - 1; i++) {
    const [first, second] = [numList[i], numList[i + 1]];
    if (first < second) {
      sum += first + (second - first) / 2;
    } else {
      sum += second + (first - second) / 2;
    }
  }
  return sum;
}

function solution(k, ranges) {
  var answer = [];
  const numList = [k];
  while (k !== 1) {
    if (k % 2) {
      k = 3 * k + 1;
    } else {
      k /= 2;
    }
    numList.push(k);
  }
  console.log(numList);
  for (let [start, end] of ranges) {
    end = numList.length - 1 + end;
    if (start > end) {
      answer.push(-1);
    } else {
      answer.push(integral(numList.slice(start, end + 1)));
    }
  }
  return answer;
}

// 20'17" / 60'00"
