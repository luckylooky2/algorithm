// 디펜스 게임 : 우선순위 큐
class Heap {
  constructor() {
    this.arr = [null];
    this.size = 0;
  }
  push = (value) => {
    this.arr.push(value);
    this.size++;
    let curr = this.size;
    let parent = Math.floor(curr / 2);
    while (curr !== 1) {
      if (this.arr[curr] > this.arr[parent]) {
        [this.arr[curr], this.arr[parent]] = [this.arr[parent], this.arr[curr]];
      }
      curr = parent;
      parent = Math.floor(curr / 2);
    }
  };

  pop = () => {
    if (this.size === 0) {
      return;
    }
    const top = this.arr.at(-1);
    this.arr[1] = top;
    this.arr.pop();
    this.size--;
    let parent = 1;
    let leftChild = parent * 2;
    let rightChild = leftChild + 1;
    while (this.arr[leftChild] !== undefined) {
      if (this.arr[rightChild] !== undefined) {
        // 둘 다 있는 경우
        let isLeftBig = this.arr[leftChild] > this.arr[rightChild];
        if (isLeftBig) {
          if (this.arr[leftChild] > this.arr[parent]) {
            [this.arr[leftChild], this.arr[parent]] = [
              this.arr[parent],
              this.arr[leftChild],
            ];
          }
        } else {
          if (this.arr[rightChild] > this.arr[parent]) {
            [this.arr[rightChild], this.arr[parent]] = [
              this.arr[parent],
              this.arr[rightChild],
            ];
          }
        }
        parent = isLeftBig ? leftChild : rightChild;
      } else if (this.arr[leftChild] !== undefined) {
        // 왼쪽만 있는 경우
        if (this.arr[leftChild] > this.arr[parent]) {
          [this.arr[leftChild], this.arr[parent]] = [
            this.arr[parent],
            this.arr[leftChild],
          ];
        }
        parent = leftChild;
      }
      leftChild = parent * 2;
      rightChild = leftChild + 1;
    }
  };
  top = () => (this.size === 0 ? null : this.arr[1]);
}

function solution(n, k, enemy) {
  var i = 0;
  let total = 0;
  const pq = new Heap();
  for (; i < enemy.length; i++) {
    const curr = enemy[i];
    total += curr;
    pq.push(curr);
    if (total > n) {
      if (k === 0) {
        break;
      }
      const top = pq.top();
      if (top !== null) {
        pq.pop();
        k--;
        total -= top;
      }
    }
  }
  return i;
}

// 40'29" / 60'00"

// n개 중에 c개를 선택해야 하는 조합 중에서 "가장 큰 또는 작은 수 등의 대표값"을 뽑아야 하는 경우에는 우선순위 큐를 사용하자
