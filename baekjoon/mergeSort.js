function merge(leftArr, rightArr) {
  let i = 0,
    j = 0;
  const ret = [];

  while (j !== rightArr.length || i !== leftArr.length) {
    // stable sort 성질을 만족시키기 위해서는 left에서 처리해주어야 함
    if (j === rightArr.length || leftArr[i] <= rightArr[j])
      ret.push(leftArr[i++]);
    else if (i === leftArr.length || leftArr[i] > rightArr[j])
      ret.push(rightArr[j++]);
  }
  return ret;
}
/**
 *
 * @param {number} left leftmost index of array to sort
 * @param {number} right rightmost index of array to sort
 * @param {number[]} arr full array to sort(fixed parameter)
 * @returns {number[]} sorted new Array
 */
function mergeSort(left, right, arr) {
  if (left === right) return [arr[left]];

  const mid = Math.floor((left + right) / 2);
  const leftArr = mergeSort(left, mid, arr);
  const rightArr = mergeSort(mid + 1, right, arr);
  return merge(leftArr, rightArr);
}

module.exports = mergeSort;

// merge sort는 stable sort
// 같은 우선순위를 가진 원소들의 순서가 그대로 유지되는 정렬 방법
// 파일을 생성 순, 이름 순으로 2번 정렬할 때, 이미 정렬한 생성 순서를 유지할 수 있음
