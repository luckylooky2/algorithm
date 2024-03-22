// 귤 고르기 : 정렬, 브루트 포스, 맵
function solution(k, tangerine) {
  var answer = 0;
  const tangerineCount = {};
  for (const elem of tangerine) {
    if (tangerineCount[elem]) {
      tangerineCount[elem]++;
    } else {
      tangerineCount[elem] = 1;
    }
  }
  const sorted = Object.entries(tangerineCount).sort((a, b) => b[1] - a[1]);
  for (const [_size, count] of sorted) {
    k -= count;
    answer++;
    if (k <= 0) {
      break;
    }
  }
  return answer;
}

// 10'23" / 60'00"
