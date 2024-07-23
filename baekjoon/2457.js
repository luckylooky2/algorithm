// 공주님의 정원 : 그리디, 정렬
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => Number(v)));
const [n] = input.shift();
const blooming = input
  .map(([a, b, c, d]) => [a * 100 + b, c * 100 + d])
  .sort((a, b) => a[0] - b[0]);

let [from, to] = [301, 301];
const [startDay, endDay] = [301, 1201];
let answer = 0;

for (const [start, end] of blooming) {
  // 지는 날이 301보다 작은 경우 pass
  if (end < startDay) {
    continue;
  }

  // 이어지지 않는 경우 break
  // - 301보다 큰 시작값이 들어온 경우도 여기에서 제외
  if (start > to) {
    break;
  }

  // 아어지고 이전 꽃이 유효한 경우
  if (start > from) {
    answer++;
    from = to;
  }
  // 이어지고 이전 꽃이 유효하지 않은 경우는, to만 결정하면 되기 때문에 pass

  to = Math.max(end, to);
  // 1201을 넘은 경우 break
  if (to >= endDay) {
    answer++;
    break;
  }
}

console.log(to < endDay ? 0 : answer);

// from, to : 이전 꽃의 기간을 저장한 변수
// - 이 정보만 있으면, "이전 꽃을 사용할지 현재 꽃을 사용할지" 결정할 수 있음
// - 기준: 현재 꽃의 피는 날짜(start)가 from 보다 일찍인지? 나중인지?
//   - 업데이트한 from은 이전 이전 꽃의 지난 날짜에 대한 정보
//   - from 보다 start가 작으면 현재 꽃과 이전 이전 꽃이 연결되기 때문에 이전 꽃이 필요하지 않음
//   - from 보다 start가 크면 현재 꽃과 이전 이전 꽃이 직접적으로 연결되지 않기 때문에 이전 꽃이 반드시 필요
// - 일찍이라면 answer에 변화는 없음
//   - 이전 꽃보다 더 넓은 범위를 가지는 경우: 현재 꽃으로 대체
//   - 현재 꽃이 이전 꽃에 포함되는 경우: 이전 꽃 선택
// - 나중이라면
//   - to 보다 큰 경우: 꽃 간의 연결이 끊긴 상황이기 때문에 로직 종료
//   - from 보다 큰 경우: 이전 이전 꽃의 지는 날짜(즉, from)보다 나중이므로 공백이 생김. 즉, 이전 꽃이 반드시 필요한 상황(answer++)

// 301         630
// |-----------|                           from: 301, to: 301 -> from: 301, to: 630
//    515               831
//     |-------|--------|                  from: 301, to: 630 -> from: 630, to: 831 (answer++)
//        610                     1210
//         |------------|----------|       from: 630, to: 831 -> from: 831, to: 1210
