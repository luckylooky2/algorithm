// 아날로그 시계 : 구현, 브루트 포스
function solution(h1, m1, s1, h2, m2, s2) {
  let flag = false;
  let count = 0;
  for (let hour = 0; hour < 24; hour++) {
    const hour12h = hour % 12;
    for (let min = 0; min < 60; min++) {
      let [isMinValid, isHourValid] = [true, true];
      const convertedHour = hour12h * 5 + min / 12;
      for (let sec = 0; sec < 60; sec++) {
        // 시작
        if (hour === h1 && min === m1 && sec === s1) {
          flag = true;
          // 이미 초침을 지난 경우에는 비활성화
          if (sec > min) {
            isMinValid = false;
          }
          if (sec > convertedHour) {
            isHourValid = false;
          }
        }
        // 끝
        if (hour === h2 && min === m2 && sec === s2) {
          flag = false;
          // cf> 반례 : (0, 0, 0) ~ (23, 0, 0)
          if (sec === 0 && min === 0) {
            count++;
            isMinValid = false;
            isHourValid = false;
          }
        }
        // 현재 초침 위치와 다음 움직인 위치 사이에 분침, 시침이 있는지 확인
        // cf> 시침(isHourValid)을 세는 대신 분침(isMinValid)를 한 번 더 세서 값이 같아진 것
        // - 1) 11시 59분에는 초침이 분침과 시침을 지나치지 않음
        // - 2) 00시 00분에는 1번만 지나침
        // - 3) 59분에는 초침이 시침만 지나침
        // - 4) 그 외의 경우에는 초침이 분침과 시침을 지나침
        if (flag) {
          if (hour12h === 11 && min === 59) {
            isMinValid = false;
            isHourValid = false;
          } else if (hour12h === 0 && min === 0) {
            if (isHourValid && isMinValid) {
              count++;
              isMinValid = false;
              isHourValid = false;
            }
          } else if (min === 59) {
            if (sec + 1 > convertedHour && isHourValid) {
              count++;
              isHourValid = false;
            }
          } else {
            if (sec + 1 > min && isMinValid) {
              count++;
              isMinValid = false;
            }
            if (sec + 1 > convertedHour && isHourValid) {
              count++;
              isHourValid = false;
            }
          }
        }
      }
    }
  }
  return count;
}
