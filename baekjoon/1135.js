// 뉴스 전하기 : 재귀, 동적 계획법, 정렬, 트리에서의 동적 계획법, 트리
const input = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));
const [n] = input.shift();
const bossNum = input.shift();
const subs = new Array(n).fill(null).map(() => new Array(0));

for (let i = 1; i < bossNum.length; i++) {
  const boss = bossNum[i];
  subs[boss].push(i);
}

function recur(curr) {
  const children = subs[curr];
  if (children.length === 0) {
    return 1;
  }
  let count = [];
  for (const child of children) {
    count.push([child, recur(child)]);
  }
  // 자식의 결과값을 큰 순서대로 정렬
  const sortBeforePlus = count.sort((a, b) => b[1] - a[1]);
  // 큰 순서대로 1...n을 더함: 가장 큰 것부터 순회하기 위함
  // - 더한 값은 해당 서브 트리를 방문할 때의 시간의 최댓값
  // - e.g. [5 + 1, 4 + 2, 4 + 3, 0 + 4]
  // - why?
  const plusFromOneEachElem = sortBeforePlus.map(([child, count], i) => [
    child,
    count + i + 1,
  ]);
  const sortAfterPlus = plusFromOneEachElem.sort((a, b) => b[1] - a[1]);
  return sortAfterPlus[0][1];
}

console.log(recur(0) - 1);

// Try 1
// - 큐를 이용하여 현재 시간을 저장하고 부하를 순회할 때의 기준 시간으로 사용
// - 단, 모든 경우의 수를 탐색하는 것은 아니기 때문에 현재 시간이 반드시 최소라는 것이 보장되어야 함
// - 즉, 부하 배열을 순회할 때 가장 많이 시간이 걸리는 곳부터 방문해야 함
// - 그래서 1) 부하의 수 2) 깊이를 기준으로 많은 순서대로 정렬했지만, 조건으로는 부족하여 통과하지 못함
// - TODO: 모든 경우의 수를 탐색하면 시간 초과가 발생하지 않을까?

// 어려운 그래프가 나온다면, 노드 당 child, count, level의 값을 구하는 공식을 만들어놓고 이 값들로 어떻게 해보자!

// Try 2
// - 동적 계획법
// - 자식 노드들의 대표값을 부모 노드의 대표값으로 저장하고 활용
