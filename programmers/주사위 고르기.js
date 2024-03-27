// 주사위 고르기 : dfs, 투 포인터
let answer;
let max = -Infinity;

function dfsSumOfDice(Arr, selected, totals, depth = 0) {
  if (depth === Arr.length) {
    let sum = 0;
    for (let i = 0; i < Arr.length; i++) {
      sum += Arr[i][selected[i]];
    }
    totals.push(sum);
    return;
  }
  for (let i = 0; i < 6; i++) {
    selected.push(i);
    dfsSumOfDice(Arr, selected, totals, depth + 1);
    selected.pop();
  }
}

// 여기가 핵심
function calculate(myDice, oppoDice, dice) {
  const myArr = dice.filter((_v, i) => myDice.includes(i));
  const oppoArr = dice.filter((_v, i) => oppoDice.includes(i));
  const selected = [];
  let win = 0;
  let [sum1, sum2] = [[], []];
  dfsSumOfDice(myArr, selected, sum1);
  dfsSumOfDice(oppoArr, selected, sum2);
  // 투 포인터
  sum1.sort((a, b) => a - b);
  sum2.sort((a, b) => a - b);
  let [p1, p2] = [0, 0];
  // 아이디어: p1을 기준으로 p1보다 작은 수의 개수(p2)를 모두 더한다
  while (p1 < sum1.length && p2 < sum2.length) {
    if (sum1[p1] > sum2[p2]) {
      p2++;
    } else {
      win += p2;
      p1++;
    }
  }
  if (p2 === sum2.length) {
    win += p2 * (sum1.length - p1);
  }
  if (win > max) {
    max = win;
    answer = myDice.slice();
  }
}

function dfsMyDice(myDice, start, depth, dice) {
  const length = dice.length;
  if (depth === length / 2) {
    const oppoDice = [];
    for (let i = 0; i < dice.length; i++) {
      if (myDice.includes(i) === false) {
        oppoDice.push(i);
      }
    }
    calculate(myDice, oppoDice, dice);
    return;
  }
  for (let i = start; i < length; i++) {
    myDice.push(i);
    dfsMyDice(myDice, i + 1, depth + 1, dice);
    myDice.pop();
  }
}

function solution(dice) {
  const myDice = [];
  dfsMyDice(myDice, 0, 0, dice);
  return answer.map((v) => Number(v) + 1);
}

// 최대 경우의 수: 10C5(dfs) * 6^10(brute force) => 시간 초과
// - 6^10을 줄여보자 => 투 포인터

// 1) 주사위마다 포인터: 최대 10개
// - 포인터가 많아지다보니, 계산이 복잡함(시간 복잡도는 줄어들 듯)
// - 2461(대표 선수) 문제와 약간 다름: 그 문제는 최대값, 최소값을 찾는 문제여서 덜 복잡함
// - 이 문제는 모든 경우의 수를 고려해야 하기 때문에 포인터가 많아질 경우, 각각의 포인터를 이용해 계산하기가 매우 힘듦
// - **포인터의 개수를 아래 방법처럼 줄이려는 생각을 해보자!**

// 2) 합계에 포인터: 고정 2개
// - 각 주사위에서 나올 수 있는 합계 배열을 계산하는 방법
// - 6^10 => 2 * 6^5로 확실히 시간 복잡도 확보
// - 아이디어: p1을 기준으로 p1보다 작은 수의 개수(p2)를 모두 더한다
// - 시도했던 방법은 p1, p2를 모두 움직이는 방법 => 지나간 이전 요소를 계산하기가 매우 복잡함
// - 특정 p1에서 계산 후, p1을 하나씩 증가해야 함
// - 단점) 무, 패는 계산하기 어려움 => 승, 패를 각각 계산하고 전체 경우의 수에서 빼자

// 두 배열에서 각각 임의의 한 원소를 비교했을 때, 한 쪽이 더 큰 경우의 수(즉, 승리)를 구할 때 이 방법을 기억하자
