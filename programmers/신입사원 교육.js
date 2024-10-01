// 신입사원 교육: 우선순위 큐
class Heap {
  constructor() {
    this.arr = [null];
    this.size = 0;
  }

  push(number) {
    this.arr.push(number);
    this.size++;

    let curr = this.size;
    let parent = Math.floor(curr / 2);
    while (curr !== 1) {
      if (this.arr[curr] < this.arr[parent]) {
        [this.arr[curr], this.arr[parent]] = [this.arr[parent], this.arr[curr]];
      }
      curr = parent;
      parent = Math.floor(curr / 2);
    }
  }

  pop() {
    if (this.size === 0) {
      return null;
    } else if (this.size === 1) {
      this.size--;
      return this.arr.pop();
    }
    this.size--;
    const top = this.arr[1];
    this.arr[1] = this.arr.pop();
    let curr = 1;
    let left = curr * 2;
    let right = left + 1;

    while (true) {
      if (this.arr[left] === undefined) {
        break;
      } else if (this.arr[right] === undefined) {
        if (this.arr[curr] > this.arr[left]) {
          [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
        }
        curr = left;
        left = curr * 2;
        right = left + 1;
      } else {
        const isLeftSmall = this.arr[left] < this.arr[right];
        if (isLeftSmall) {
          if (this.arr[curr] > this.arr[left]) {
            [this.arr[curr], this.arr[left]] = [this.arr[left], this.arr[curr]];
          }
        } else {
          if (this.arr[curr] > this.arr[right]) {
            [this.arr[curr], this.arr[right]] = [
              this.arr[right],
              this.arr[curr],
            ];
          }
        }
        curr = isLeftSmall ? left : right;
        left = curr * 2;
        right = left + 1;
      }
    }
    return top;
  }
}

function solution(ability, number) {
  var answer = 0;
  const heap = new Heap();
  for (const ab of ability) {
    heap.push(ab);
    answer += ab;
  }
  for (let i = 0; i < number; i++) {
    const first = heap.pop();
    const second = heap.pop();
    answer += first + second;
    heap.push(first + second);
    heap.push(first + second);
  }
  return answer;
}
