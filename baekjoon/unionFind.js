// 최상위 부모 노드를 찾는 함수(재귀)
function getParent(parentArr, x) {
  // 최상위 부모일 경우 리턴
  if (parentArr[x] === x) return x;
  // 최상위 부모가 아닐 경우, 재귀적으로 최상위 부모를 찾음
  return getParent(parentArr, parentArr[x]);
}

// 두 부모 노드를 합치는 함수
function unionParent(parentArr, a, b) {
  a = getParent(parentArr, a);
  b = getParent(parentArr, b);

  // 1. 각각의 노드의 최상위 부모를 구하고(a, b 값)
  // 2. 최상위 부모(parentArr 배열)를 최신화하여 그래프가 합쳐지는 효과(두 개의 최상위 노드의 부모를 다른 하나의 최상위 노드로 바꾸어 트리를 병합)
  // e.g.
  // 1 2 => parentArr[2] = 1
  // 5 6 => parentArr[6] = 5

  // 두 노드가 연결되어 있다면, 같은 최상위 부모를 가리킬 것이고 최신화되는 항목은 없음
  // e.g.
  // 1 1 => parentArr[1] = 1

  // 일반적으로 더 작은 값으로 합침
  // 재귀 호출을 이용하여 최상위 부모를 저장하므로 모든 노드를 돌지 않고 평균 4번 이내에 처리할 수 있음
  if (a > b) parentArr[a] = b;
  else parentArr[b] = a;
}

// 같은 부모를 가지는지 확인하는 함수
function findParent(parentArr, a, b) {
  // 재귀적으로 연결되어 있는 가장 상위 부모를 확인하는 과정
  a = getParent(parentArr, a);
  b = getParent(parentArr, b);
  return a === b;
}

function main() {
  const parentArr = new Array(11).fill(0).map((_v, i) => i);
  unionParent(parentArr, 1, 2);
  unionParent(parentArr, 2, 3);
  unionParent(parentArr, 3, 4);
  unionParent(parentArr, 5, 6);
  unionParent(parentArr, 6, 7);
  unionParent(parentArr, 7, 8);

  console.log(findParent(parentArr, 1, 5));
  console.log(parentArr);

  unionParent(parentArr, 2, 7);

  console.log(findParent(parentArr, 1, 8));
  console.log(parentArr);

  unionParent(parentArr, 2, 8);

  console.log(findParent(parentArr, 1, 8));
  console.log(parentArr);
}

main();

// union find는 언제 사용하는가?
// 두 노드가 같은 그래프 상에 속하는 가를 빠르게 파악하기 위해 사용
// "parentArr 배열"과 "재귀 호출"을 이용
// 1. parentArr : (가장 값이 작은) 최상위 부모 노드를 저장
// 2. 재귀 호출 : 최상위 부모를 찾음으로써 성능을 최적화

// union 연산은 서로 다른 두 개의 집합을 하나의 집합으로 병합하는 연산을 말한다. 이 자료구조에서는 상호 배타적 집합만을 다루므로 Union 연산은 합집합 연산과 동치이다
// find 연산은 하나의 원소가 어떤 집합에 속해있는지를 판단하는 연산을 말한다

// Union-Find 자료구조에서 각 원소는 하나의 집합을 나타내며, 각 집합은 대표 원소를 통해 식별됩니다.
// 만약 원소들이 서로 다른 집합에서 같은 식별자를 가지고 있다면, 이는 잘못된 상태입니다.
// > 두 원소 A와 B가 서로 "다른" 집합에서 속한 상태에서 A와 B의 식별자가 같아진다면, 이는 두 집합이 하나로 합쳐진 것이 아니라, 데이터 구조의 불일치를 나타냅니다
// > 반대로 두 원소 A와 B가 "같은" 집합에서 속한 상태에서 A와 B의 식별자가 같아진다면, 이는 두 집합이 하나로 병합된 것을 의미합니다

// 서로소 집합(Disjoint Sets)
// 서로 겹치지 않는, 즉 공통된 원소가 없는 집합들을 의미합니다
// 1. 내부 비중복 : 같은 집합에 속하는 어떤 두 원소도 같은 값을 갖지 않습니다
// 2. 외부 비중복 : 두 서로소 집합 A와 B가 있다면, A와 B의 교집합은 공집합입니다
// 그래프 이론에서 사이클 검출이나 최소 신장 트리 알고리즘 등에서 유용하게 사용됩니다

// 1. 초기 상태: {1}, {2}, {3}, {4}, {5}
// 2. union(1, 2): {1, 2}, {3}, {4}, {5}
// 3. union(3, 4): {1, 2}, {3, 4}, {5}
// 4. union(2, 5): {1, 2, 5}, {3, 4}
// 5. find(4) : 대표값 3
