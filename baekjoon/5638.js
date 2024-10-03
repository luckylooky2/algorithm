// 수문 : 브루트 포스, 조합
const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
let idx = 0;
const gateNum = +input[idx++];
const gateInfo = [];
const answer = [];

for (let i = 0; i < gateNum; i++) {
  gateInfo.push(input[idx++].split(" ").map((v) => +v));
}

const testNum = +input[idx++];

for (let i = 0; i < testNum; i++) {
  const [water, hour] = input[idx++].split(" ").map((v) => +v);
  const res = solve(water, hour, gateInfo);
  answer.push(res === Infinity ? "IMPOSSIBLE" : res);
}

console.log(answer.map((v, i) => `Case ${i + 1}: ${v}`).join("\n"));

function recur(gateInfo, water, hour, max, visit = [], curr = 0) {
  let min = Infinity;
  if (visit.length === max) {
    const [waterPerHour, cost] = visit.reduce(
      (acc, curr) => {
        acc[0] += gateInfo[curr][0];
        acc[1] += gateInfo[curr][1];
        return acc;
      },
      [0, 0]
    );

    return waterPerHour * hour >= water ? cost : Infinity;
  }

  // 조합을 구현할 때, 항상 visit.includes 또는 비트를 사용하여 체크를 해주어야 한다고 생각했는데
  // - i = curr 부터 시작한다면 확인할 필요가 없었음
  // - 완벽하게 이해한 것이 아니므로 동작이 다를 경우, visit를 확인해보자
  for (let i = curr; i < gateNum; i++) {
    visit.push(i);
    const res = recur(gateInfo, water, hour, max, visit, i + 1);
    min = Math.min(min, res);
    visit.pop();
  }

  return min;
}

function solve(water, hour, gateInfo) {
  let min = Infinity;
  for (let select = 1; select <= gateInfo.length; select++) {
    const res = recur(gateInfo, water, hour, select);
    min = Math.min(min, res);
  }
  return min;
}

// 1시간 당 비용이 아니기 때문에 조금 쉬운 문제
// - 모든 시간 가동했을 때, 되는지 안 되는지만 판단
