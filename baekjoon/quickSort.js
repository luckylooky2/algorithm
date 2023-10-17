// quick sort : 현재 pivot이 들어갈 자리를 찾는 것
// 들어갈 자리를 찾는다는 점에서 insertion sort와 비슷한 측면이 있음
function quickSort(start, end, arr) {
  // start === end || end < 0 || start >= arr.length - 1
  // 아래 경우에 포함됨
  if (start > end) return;

  const pivot = arr[start];
  // 추가적인 공간을 이용하지 않는 방법(In-place sort)
  // - 두 개 포인터를 사용
  // - 위에서 pivot이 들어갈 위치를 r이 정함(현재 pivot보다 큰 요소의 개수)
  let l = start + 1,
    r = end;
  let tmp;
  // O(n)
  while (l <= r) {
    while (arr[l] <= pivot) l++;
    while (arr[r] > pivot) r--;

    if (l > r) break;
    // 중간 값 바꾸기
    tmp = arr[l];
    arr[l] = arr[r];
    arr[r] = tmp;
  }
  // pivot 바꾸기
  tmp = arr[r];
  arr[r] = arr[start];
  arr[start] = tmp;

  // O(logn)
  quickSort(start, r - 1, arr);
  quickSort(r + 1, end, arr);
  return arr;
}

module.exports = quickSort;

// 장점) 캐시 적중률 때문에 같은 O(nlogn)이어도 더 빠름
// 단점) 최악의 경우 O(n^2)가 나올 수 있음 => 이미 정렬된 경우
// 라이브러리는 어떻게 해결? 랜덤 pivot 선택, pivot 후보 3개 중 중간값을 선택, 일정 깊이 이상 들어가면 heap sort로 바꿔 정렬

// 추가적인 공간을 이용하는 방법
// - 캐시 적중률이 낮고, 공간 복잡도가 커지는 단점
// const tmp = [];
// for (let i = 0; i < arr.length; i++) if (pivot > arr[i]) tmp.push(arr[i]);
// tmp.push(pivot);
// for (let i = 0; i < arr.length; i++) if (pivot < arr[i]) tmp.push(arr[i]);

// 추가적인 공간을 이용하지 않는 방법(In-place sort)
// - 두 개 포인터를 사용
// - 위에서 pivot이 들어갈 위치를 r이 정함(현재 pivot보다 큰 요소의 개수)

// l은 pivot보다 작은 개수를 세는 용도
// - pivot보다 큰 수가 나오는 경우 스왑을 위해 멈춤
// - l === end + 1이라면, 모든 수가 pivot보다 작다는 뜻 => pivot이 가장 끝 인덱스(end)로 감
// - l !== end + 1이라면, pivot이 중간에 있는 요소와 교체하게 됨

// r은 pivot보다 큰 개수를 세며, pivot이 들어갈 자리를 찾는 용도
// - pivot보다 작은 수가 나오는 경우 스왑을 위해 멈춤
// - l > r이라면, pivot보다 더 이상 작은 수가 없는 것이므로 => 현재 r이 pivot의 자리가 됨
