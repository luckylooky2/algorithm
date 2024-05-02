// 큰 수 만들기 : 그리디, 스택
function solution(number, k) {
  number = number.split("").map((v) => Number(v));
  const answer = [];
  const discard = [];
  const maxLen = number.length - k;
  let i = 0;

  while (i < number.length) {
    const curr = number[i];
    let top = answer.length ? answer.at(-1) : 0;
    // 버린 수의 개수가 k와 같다면, 더 이상 버리지 않음
    if (curr > top && discard.length < k) {
      // 현재 추가하려는 값(curr)보다 작은 값을 answer에서 모두 pop
      while (answer.length) {
        if (answer.at(-1) < curr) {
          discard.push(answer.pop());
          if (discard.length === k) {
            break;
          }
        } else {
          break;
        }
      }
    }
    if (answer.length < maxLen) {
      answer.push(curr);
    }
    i++;
  }
  return answer.join("");
}

// 26'14"

// "1924"		2	"94"
// "1231234"	3	"3234"
// "4177252841"	4	"775841"
