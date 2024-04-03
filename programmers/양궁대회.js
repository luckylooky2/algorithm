// 양궁 대회 : dfs, 구현
let diff = -Infinity;
let answer = [-1];

function calc(isWin, info, n) {
  const myInfo = info.slice().fill(0);
  for (let i = 0; i < isWin.length - 1; i++) {
    if (isWin[i]) {
      const myScore = info[i] + 1;
      myInfo[i] = myScore;
      n -= myScore;
    }
  }
  if (n >= 0) {
    let myFinal = 0;
    let oppoFinal = 0;
    for (let i = 0; i < isWin.length - 1; i++) {
      const win = isWin[i];
      if (win) {
        myFinal += 10 - i;
      } else if (info[i] > 0) {
        oppoFinal += 10 - i;
      }
    }
    if (myFinal > oppoFinal) {
      myInfo[10] = n;
      if (myFinal - oppoFinal >= diff) {
        if (myFinal - oppoFinal > diff) {
          answer = myInfo.slice();
        } else {
          for (let i = 10; i >= 0; i--) {
            const orig = answer[i];
            const curr = myInfo[i];
            if (orig < curr) {
              answer = myInfo.slice();
              break;
            } else if (orig > curr) {
              break;
            }
          }
        }
        diff = myFinal - oppoFinal;
      }
    }
  }
}

function dfs(isWin, info, n, i = 0, depth = 0) {
  calc(isWin, info, n);

  if (depth === isWin.length) {
    return;
  }

  for (let j = i; j < isWin.length; j++) {
    isWin[j] = true;
    dfs(isWin, info, n, j + 1, depth + 1);
    isWin[j] = false;
  }
}

function solution(n, info) {
  const isWin = new Array(info.length).fill(false);
  dfs(isWin, info, n);
  return answer;
}

// 115'29" / 60'00"

// 점수의 조합(n^10)을 승패의 조합(2^10)으로 줄일 수 있어 시간 초과를 해결할 수 있다
// 나머지는 구현 문제

// 1시간 정도 만에 다 풀었는데 실수 때문에 1시간을 날림

// 점수 차이를 최대로 이기기 위한 조건
// - 이길 때 최소로 이긴다
// - 큰 것부터 채워나간다

// 답을 도출하기 위한 조건이 하나 더 있었다 => 같은 점수 차이라면, 적은 점수를 많이 쏘면 이기는 조건
// 간단한 조건이지만, diff 최신화를 제일 위에서 하여 diff가 바뀌는 바람에 아래 계산이 꼬였다
// - 공통적인 것은 되도록이면 아래서 하자
// - 아니면, 반드시 두 번이상 사용될 것은 변수화하자
// 두 가지 중 하나만 했어도 빠르게 해결될 문제였다
