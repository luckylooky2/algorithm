// 택배 상자 : 스택, 구현
function solution(order) {
  let i = 0;
  const len = order.length;
  const conveyor = Array.from({ length: len }, (v, i) => len - i);
  const stack = [];
  const result = [];
  while (conveyor.length) {
    const curr = conveyor.pop();
    if (order[i] === curr) {
      result.push(curr);
      i++;
      while (stack.length) {
        if (order[i] === stack.at(-1)) {
          result.push(stack.pop());
          i++;
        } else {
          break;
        }
      }
    } else {
      stack.push(curr);
    }
  }
  return result.length;
}

// 18'06" / 60'00"
