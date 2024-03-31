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
