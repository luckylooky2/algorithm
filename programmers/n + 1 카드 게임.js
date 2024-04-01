// n + 1 카드 게임 : 그리디, 구현, 시뮬레이션
function remove(list, target) {
  const tmp = [];
  while (list.length) {
    const popped = list.pop();
    if (popped !== target) {
      tmp.push(popped);
    }
  }

  while (tmp.length) {
    list.push(tmp.pop());
  }
}

function check(deck1, deck2, target) {
  const set = deck2.reduce((acc, curr) => {
    acc[curr] = true;
    return acc;
  }, {});
  for (const card of deck1) {
    if (set[target - card]) {
      remove(deck1, card);
      remove(deck2, target - card);
      return true;
    }
  }
  return false;
}

function solution(coin, cards) {
  const n = cards.length;
  const target = n + 1;
  let i = 0;
  const hand = cards.slice(0, n / 3);
  const deck = cards.slice(n / 3, cards.length);
  const pending = [];
  let turn = 1;

  while (coin >= 0 && i !== deck.length) {
    pending.push(deck[i++]);
    pending.push(deck[i++]);

    if (check(hand, hand, target)) {
    } else if (coin >= 1 && check(hand, pending, target)) {
      coin -= 1;
    } else if (coin >= 2 && check(pending, pending, target)) {
      coin -= 2;
    } else {
      break;
    }
    turn++;
  }
  return turn;
}

// 시도 1
// - 두 장을 뽑고, 두 장을 다 넣었을 때 완성되는 짝의 개수를 구함
// - 완성되지 못하는 카드의 다른 짝의 인덱스를 구해서, 현재 완성할 수 있는 짝의 개수(예상 라운드)로 도달 가능하다면 코인을 사용하여 가진다
// - 문제는 현재 2개를 가지는 것보다, 다음 차례에 2개를 가지는 것이 더 오래갈 수 있음(즉, 현재 차례만 고려하면 안 됨)
// - e.g. 2, [5, 8, 1, 2, 9, 4, 12, 11, 3, 10, 6, 7] => answer : 4
// - 시도 1에는 현재 뽑은 두 장을 현재 단계에서 사용할지 말지를 바로 결정하므로 위와 같은 예외 상황을 고려할 수 없음

// 코인을 현재 뽑은 단계에서 차감하지 말고, 이후 단계에서 차감할 수 있다는 생각을 해보자
// 지금은 현재 뽑은 것이 이후의 단계에 영향을 미치는 것을 고려하는 방법을, 인덱스 차이 / 2로 생각했다
// hand 배열과 pending 배열을 분리하는 것이 중요하다
// - 여기서는 뽑은 것을 바로 사용하나 세 차례 후에 사용하나 "같은 상황"이기 때문에 pending 배열에 계속 유지하는 것이 가능하다

// 정답
// - pending 배열에 뽑긴하였지만 현재 당장 사용하지 않는 카드라도 보관한다
// - hand 배열에 있는 카드만 사용할 경우, 뽑은 2장의 카드를 버리는 것이라고 생각할 수 있지만 아니다
// - 일단 pending 배열에 보관하고, 다음 2장의 카드를 뽑았을 때 pending 배열에 존재하는 카드와 짝이 맞는다면 그 때 카드를 내고 코인을 사용한다
// - 나는 현재 뽑은 것을 기준으로 뒤의 경우를 고려하는 방식이었지만, 정답은 현재 뽑은 것을 기준으로 앞의 경우를 고려하였다
// - 그래서 pending 배열에 있는 카드를 절대 hand 배열로 옮기지 않는다 => hand 배열로 옮긴다는 것은 코인을 사용한다는 것이고, 뒤의 사건에 영향을 미칠 수 있기 때문이다
// - hand 배열에 있는 두 카드를 내는 경우 : 코인을 사용하지 않는 경우이다
// - hand 배열에서 하나, pending 베열에서 하나를 내는 경우 : 코인을 하나 사용하여 카드를 내는 경우이다
// - pending 배열에 있는 두 카드를 내는 경우 : 코인을 두 개 사용하는 경우이다. 앞서 뽑았던 카드를 기준으로 뒤를 고려하여 뽑게 되는 것과 마찬가지이다
// - hand 배열이 다 소모가 되면, 그 다음부터는 코인을 사용하여 카드를 낼 수 밖에 없다

// 이 방법이 아니면, 현재 카드를 고르거나 고르지 않거나 하는 조합으로 가야하는데, 훨씬 복잡해질 수 있다
