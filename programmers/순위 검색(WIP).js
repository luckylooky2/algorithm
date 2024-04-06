// 순위 검색
class Food {
  constructor() {
    this.pizza = [];
    this.chicken = [];
  }
}

class Career {
  constructor() {
    this.junior = new Food();
    this.senior = new Food();
  }
}

class Position {
  constructor() {
    this.backend = new Career();
    this.frontend = new Career();
  }
}

class Language {
  constructor() {
    this.java = new Position();
    this.cpp = new Position();
    this.python = new Position();
  }
}

function concat(entries, newDB, list = [], depth = 0) {
  if (Array.isArray(entries[0][1])) {
    let curr = newDB,
      i = 0;
    for (let i = 0; i < list.length; i++) {
      curr = curr[list[i]];
    }
    curr["pizza"] = curr["pizza"].concat(entries[0][1]);
    curr["chicken"] = curr["chicken"].concat(entries[1][1]);
    return;
  }
  entries.map(([key, value]) => {
    if (depth !== 0) {
      list.push(key);
    }
    concat(Object.entries(value), newDB, list, depth + 1);
    list.pop();
  });
}

function solution(info, query) {
  var answer = [];
  const sortFunction = (a, b) => a - b;
  const db = new Language();
  for (const elem of info) {
    const [lang, pos, career, food] = elem.split(" ");
    db[`${lang}`][`${pos}`][`${career}`][`${food}`].push(elem);
  }
  for (const elem of query) {
    const [lang, pos, career, food, score] = elem
      .split(" ")
      .filter((v) => v !== "and");
    let curr = db;
    if (lang === "-") {
      const newPos = new Position();
      concat(Object.entries(curr), newPos);
      curr = newPos;
    } else {
      curr = curr[lang];
    }
    if (pos === "-") {
      const newCareer = new Career();
      concat(Object.entries(curr), newCareer);
      curr = newCareer;
    } else {
      curr = curr[pos];
    }
    if (career === "-") {
      const newFood = new Food();
      concat(Object.entries(curr), newFood);
      curr = newFood;
    } else {
      curr = curr[career];
    }
    if (food === "-") {
      curr = curr["pizza"].concat(curr["chicken"]);
    } else {
      curr = curr[food];
    }
    answer.push(
      curr
        .map((v) => Number(v.split(" ").at(-1)))
        .sort(sortFunction)
        .filter((v) => v >= score).length
    );
  }
  return answer;
}
