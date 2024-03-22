// 숫자 카드 나누기 : 브루트 포스, 최대공약수
const getCD = function (arr) {
  const res = [];
  for (let i = 2; i <= arr[0]; i++) {
    let count = 0;
    for (const elem of arr) {
      if (elem % i === 0) {
        count++;
      } else {
        break;
      }
    }
    if (count === arr.length) {
      res.push(i);
    }
  }
  return res;
};

// 유클리드 호제법(gif 참조)
// a > b 가정
// a = bq + r
// https://ko.wikipedia.org/wiki/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C_%ED%98%B8%EC%A0%9C%EB%B2%95
const GCD = function (a, b) {
  const r = a % b;
  if (r === 0) return b;
  return GCD(b, r);
};

function solution(arrayA, arrayB) {
  var answer = 0;
  const sortFunction = (a, b) => a - b;
  const sortedA = arrayA.slice().sort(sortFunction);
  const sortedB = arrayB.slice().sort(sortFunction);
  const candidatesA = getCD(sortedA);
  const candidatesB = getCD(sortedB);
  const gcdA = candidatesA.length ? candidatesA.at(-1) : 0;
  const gcdB = candidatesB.length ? candidatesB.at(-1) : 0;
  if (gcdA) {
    let count = 0;
    for (const elemB of sortedB) {
      if (elemB % gcdA === 0) {
        break;
      } else {
        count++;
      }
    }
    if (count === sortedA.length) {
      answer = Math.max(answer, gcdA);
    }
  }
  if (gcdB) {
    let count = 0;
    for (const elemA of sortedA) {
      if (elemA % gcdB === 0) {
        break;
      } else {
        count++;
      }
    }
    if (count === sortedB.length) {
      answer = Math.max(answer, gcdB);
    }
  }
  return answer;
}

// 브루트 포스로 해도 시간 초과가 발생하지 않는 이유?
// - GCD로 하면 더 빠를 듯?

// 마지막 CD 즉, GCD만 확인하면 됨
// why? GCD가 상대편 배열에 있다는 것은 CD 배열(공약수)가 모두 안 된다는 것을 뜻함
// GCD의 특징 : 두 수의 공약수 배열은 최대 공약수의 약수 배열과 항상 같다
// 따라서 최대공약수가 상대편 배열에 있다면, 모든 약수 배열 또한 상대편 배열에 있다는 것을 의미하고
// 최대공약수가 상대편 배열에 없다면, 다른 약수보다 최대 공약수가 더 크므로 답이 될 수 밖에 없다

// 최대공약수(GCD) : 유클리드 호제법 gif를 생각하며 코드를 생각해보자
// 최소공배수(LCM) : GCD(a,b) × LCM(a,b) = a × b
