// 연속된 부분 수열의 합 : 투 포인터
function solution(sequence, k) {
  var answer = [];

  let left = 0,
    right = 0;
  let sum = sequence[0];
  let ansLen = Infinity; // 현재 answer의 길이

  // left > right인 상황은 없음 : k > 0이기 때문에, left > right는 sum이 음수라는 뜻
  // 왜 right 포인터가 sequence 배열을 넘어가면 끝나는가?
  // 현재 상황은 k > sum이라는 뜻인데, 더 이상 더할 값이 없으므로 left를 옮겨봤자 answer를 업데이트하는 상황은 발생하지 않음
  while (right < sequence.length) {
    // 1. sum이 더 작을 때 : right 포인터를 옮김
    if (sum < k) {
      // right 포인터가 sequence 배열 index를 넘는 것을 방지
      // 이 조건에 해당하는 경우 종료
      if (right + 1 < sequence.length) sum += sequence[right + 1];
      ++right;
    }
    // 2. sum이 더 클 때 : left 포인터를 옮김
    else if (sum > k) {
      sum -= sequence[left];
      ++left;
    }
    // 3. sum과 같을 때
    else {
      // answer을 최신화 => 여기서 로직이 종료되는 것은 아님
      // 더 짧은 구간이 뒤에도 남아있을 수도 있기 때문에
      if (ansLen > right - left + 1) {
        ansLen = right - left + 1;
        answer[0] = left;
        answer[1] = right;
      }

      // 왜 left 포인터와 right 포인터를 둘 다 옮기는가?
      // e.g. 2 / 3에서 할 수 있는 경우의 수
      // 1) left++ : 3 / 3 => k보다 당연히 작아짐, right++을 다시 해야 함
      // 2) right++ : 2 / 4 => k보다 당연히 커짐, left++을 다시 해야 함
      // 3) 둘 다 : 3 / 4 => 위 두 가지 경우의 수 둘 다 같은 결과

      // 같은 경우, ansLen이 가장 작은 길이(0)이기 때문에 break
      if (left === right) break;
      // left 포인터 증가
      sum -= sequence[left];
      left++;
      // right 포인터 증가
      if (right + 1 < sequence.length) sum += sequence[right + 1];
      right++;
    }
  }
  return answer;
}
