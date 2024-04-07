// 순위 검색 : 구현, 정렬, 이분 탐색
class Food {
  constructor() {
    this.pizza = [];
    this.chicken = [];
    this.all = [];
  }
}

class Career {
  constructor() {
    this.junior = new Food();
    this.senior = new Food();
    this.all = new Food();
  }
}

class Position {
  constructor() {
    this.backend = new Career();
    this.frontend = new Career();
    this.all = new Career();
  }
}

class Language {
  constructor() {
    this.java = new Position();
    this.cpp = new Position();
    this.python = new Position();
    this.all = new Position();
  }
}

function binarySearch(arr, target, start = 0, end = arr.length) {
  if (start === end) {
    return start;
  }
  let mid = Math.floor((start + end) / 2);
  if (arr[mid] >= target) {
    return binarySearch(arr, target, start, mid);
  } else {
    return binarySearch(arr, target, mid + 1, end);
  }
}

function solution(info, query) {
  var answer = [];
  const sorted = info.sort((a, b) => {
    let [lang1, pos1, career1, food1, score1] = a.split(" ");
    let [lang2, pos2, career2, food2, score2] = b.split(" ");
    return Number(score1) - Number(score2);
  });
  const db = new Language();
  for (let i = 0; i < sorted.length; i++) {
    let [lang, pos, career, food, score] = sorted[i].split(" ");
    score = Number(score);
    db[`${lang}`][`${pos}`][`${career}`][`${food}`].push(score);
    db["all"][`${pos}`][`${career}`][`${food}`].push(score);
    db[`${lang}`]["all"][`${career}`][`${food}`].push(score);
    db[`${lang}`][`${pos}`]["all"][`${food}`].push(score);
    db[`${lang}`][`${pos}`][`${career}`]["all"].push(score);
    db["all"]["all"][`${career}`][`${food}`].push(score);
    db["all"][`${pos}`]["all"][`${food}`].push(score);
    db["all"][`${pos}`][`${career}`]["all"].push(score);
    db[`${lang}`]["all"]["all"][`${food}`].push(score);
    db[`${lang}`]["all"][`${career}`]["all"].push(score);
    db[`${lang}`][`${pos}`]["all"]["all"].push(score);
    db["all"]["all"]["all"][`${food}`].push(score);
    db["all"][`${pos}`]["all"]["all"].push(score);
    db["all"]["all"][`${career}`]["all"].push(score);
    db[`${lang}`]["all"]["all"]["all"].push(score);
    db["all"]["all"]["all"]["all"].push(score);
  }

  for (const elem of query) {
    const [lang, pos, career, food, score] = elem
      .split(" ")
      .filter((v) => v !== "and")
      .map((v) => (v === "-" ? "all" : v));

    const total = db[lang][pos][career][food];
    answer.push(total.length - binarySearch(total, score));
  }
  return answer;
}

// 213'10" / 60'00"

// 미리 정렬 : 정렬을 먼저 한 상태로 차례대로 다른 배열에 push하게 되면, 해당 속성으로 정렬한 순서가 유지된다
// - 여러 개의 배열에 나눠 push를 하는 경우에, 여러 개의 배열을 각각 정렬하면 효율성이 떨어지므로 먼저 정렬을 하는 방법을 이용

// 1차 시도
// - 2차 시도로 한 방법이 확장성이 없기 때문에(hard-coded) 다른 방법을 생각해 보았다
// - 인자로 넣은 객체들을 복사하여 합하는 과정 => concat()
// - 어떤 객체를 넣더라도 마지막 food 아래에 있는 배열을 새로운 객체에 concat하는 방법 : dfs를 이용하여 완전 탐색
// - 시간 초과가 발생 : dfs 자체로도 꽤 많은 시간이 소요되는데, 단계를 거치면서 중복도 발생

// 2차 시도
// - all이라는 추가 객체를 두고, 한꺼번에 모두 저장하는 방법
// - 확장성이 부족한 단점

// query 반복문 안에서 O(n)을 할 수 없음
// - 정렬, 순회가 불가능
// - 정렬을 "미리" 해야 하고, 이분 탐색을 통해 순회를 우회해야 함
