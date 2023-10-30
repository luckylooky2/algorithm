// 뒤에 있는 큰 수 찾기 : 스택, 그리디
function solution(numbers) {
  var answer = [-1];
  const stack = [numbers[numbers.length - 1]];
  for (let i = numbers.length - 2; i >= 0; i--) {
    const curr = numbers[i];
    while (stack.length && stack[stack.length - 1] <= curr) stack.pop();
    // 뒤가 더 큰 경우
    if (stack[stack.length - 1] > curr) answer.push(stack[stack.length - 1]);
    // 앞이 더 크거나 같은 경우
    else answer.push(-1);
    stack.push(curr);
  }
  return answer.reverse();
}
