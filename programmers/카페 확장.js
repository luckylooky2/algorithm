// 카페 확장 : 큐
function solution(menu, order, k) {
  var answer = 0;
  let time = 0;
  const q = [];
  let idx = 0;

  for (const o of order) {
    const makingTime = menu[o];
    while (time >= q[idx]) {
      idx++;
    }
    if (idx < q.length) {
      q.push(q[q.length - 1] + makingTime);
    } else {
      q.push(time + makingTime);
    }
    answer = Math.max(answer, q.length - idx);
    time += k;
  }
  return answer;
}
