// 숫자 변환하기 : bfs
function solution(x, y, n) {
  const q = [[x, 1]];
  let index = 0;
  const visited = new Array(1000001).fill(0);
  visited[x] = 1;

  while (q.length !== index) {
    const [prev, count] = q[index++];

    if (prev === y) {
      return count - 1;
    }

    if (visited[prev + n] === 0 && prev + n <= 1000000) {
      q.push([prev + n, count + 1]);
      visited[prev + n] = count + 1;
    }
    if (visited[prev * 2] === 0 && prev * 2 <= 1000000) {
      q.push([prev * 2, count + 1]);
      visited[prev * 2] = count + 1;
    }
    if (visited[prev * 3] === 0 && prev * 3 <= 1000000) {
      q.push([prev * 3, count + 1]);
      visited[prev * 3] = count + 1;
    }
  }

  return visited[y] === 0 ? -1 : visited[y] - 1;
}

// 18'45" / 60'00"
